import { doc, getDoc, setDoc, deleteDoc, onSnapshot, collection, query, orderBy, limit, getDocs } from 'firebase/firestore'
import { QUEST_POOL } from '../utils/questPool'

export const useHunterState = () => {
  const defaultState = {
    profile: {
      name: 'Sung Jin-Woo',
      hunterClass: 'FIGHTER',
      level: 1,
      rank: 'E-Rank',
      exp: 0,
      maxExp: 1000,
      gold: 0,
      position: 9999999,
      dailyDate: '',
      penaltyMessage: ''
    },
    dailyRewards: {
      exp: 100,
      gold: 500
    },
    stats: {
      str: 10,
      agi: 10,
      end: 10,
      per: 10,
      int: 10
    },
    quests: [],
    skills: [
      { id: 'sprint_burst', name: 'Sprint Burst', type: 'Aktif', level: 2, manaCost: '10/DETIK', desc: 'Meningkatkan kecepatan gerakan sebesar 30% selama skill aktif. Efektif untuk menghindari serangan fatal atau mengejar target.', exp: 450, maxExp: 1000, icon: 'directions_run', isUnlocked: true },
      { id: 'iron_will', name: 'Iron Will', type: 'Pasif', level: 1, manaCost: null, desc: 'Mengurangi rasa sakit fisik akibat serangan sebesar 20%. Meningkatkan ketahanan mental saat HP berada di bawah 30%.', exp: 150, maxExp: 1000, icon: 'shield', isUnlocked: true },
      { id: 'bloodlust', name: '???', type: '???', level: 0, manaCost: null, desc: 'Capai Level 30 untuk membuka slot skill ini.', exp: 0, maxExp: 1000, icon: 'lock', isUnlocked: false }
    ],
    timer: {
      hours: 11,
      minutes: 59,
      seconds: 59
    },
    rewardsClaimed: false
  }

  const state = useState('hunter-state', () => JSON.parse(JSON.stringify(defaultState)))
  const currentUser = ref(null)
  
  let unsubscribeSnapshot = null

  const initFirestore = () => {
    if (process.server) return
    const { $auth, $db } = useNuxtApp()
    if (!$auth || !$db) return

    $auth.onAuthStateChanged(async (user) => {
      currentUser.value = user
      if (user) {
        if (user.displayName) defaultState.profile.name = user.displayName

        const docRef = doc($db, 'hunters', user.uid)
        const docSnap = await getDoc(docRef)
        
        if (!docSnap.exists()) {
          // Initialize new hunter profile
          await setDoc(docRef, defaultState)
          state.value = JSON.parse(JSON.stringify(defaultState))
        } else {
          state.value = docSnap.data()
          // Ensure dailyDate and dailyRewards exist for old accounts
          if (!state.value.profile.dailyDate) state.value.profile.dailyDate = ''
          if (!state.value.dailyRewards) state.value.dailyRewards = { exp: 100, gold: 500 }
        }
        
        await checkAndResetDailyQuests()
        
        // Listen to real-time changes
        if (unsubscribeSnapshot) unsubscribeSnapshot()
        unsubscribeSnapshot = onSnapshot(docRef, (doc) => {
          if (doc.exists()) {
            state.value = doc.data()
          }
        })
      } else {
        if (unsubscribeSnapshot) {
          unsubscribeSnapshot()
          unsubscribeSnapshot = null
        }
        state.value = JSON.parse(JSON.stringify(defaultState))
      }
    })
  }

  const saveToFirestore = async () => {
    if (!currentUser.value) return
    const { $db } = useNuxtApp()
    const docRef = doc($db, 'hunters', currentUser.value.uid)
    await setDoc(docRef, state.value)
  }

  const getRankMultiplier = (rank) => {
    if (rank.includes('S')) return 5.0
    if (rank.includes('A')) return 4.0
    if (rank.includes('B')) return 3.0
    if (rank.includes('C')) return 2.0
    if (rank.includes('D')) return 1.5
    return 1.0 // E-Rank
  }

  const checkAndResetDailyQuests = async () => {
    const today = new Date().toLocaleDateString('en-CA') // YYYY-MM-DD format local time
    if (state.value.profile.dailyDate !== today || !state.value.quests || state.value.quests.length === 0) {
      
      // LOGIKA PENALTI: Cek apakah hari kemarin quest selesai
      if (state.value.profile.dailyDate && state.value.quests && state.value.quests.length > 0) {
        const allCompleted = state.value.quests.every(q => q.current >= q.target)
        if (!allCompleted) {
          const penaltyPercent = 0.25 + (Math.random() * 0.55) // 25% - 80%
          const expLoss = Math.floor(state.value.profile.exp * penaltyPercent)
          
          state.value.profile.exp -= expLoss
          if (state.value.profile.exp < 0) state.value.profile.exp = 0
          
          const percentString = (penaltyPercent * 100).toFixed(0)
          state.value.profile.penaltyMessage = `PENALTY ZONE: Anda gagal menyelesaikan Daily Quest kemarin. Hukuman: Kehilangan ${expLoss.toLocaleString()} EXP (${percentString}% dari total).`
        }
      }

      const shuffled = [...QUEST_POOL].sort(() => 0.5 - Math.random())
      const selected = shuffled.slice(0, 4)
      const multiplier = getRankMultiplier(state.value.profile.rank)
      
      state.value.quests = selected.map(q => {
        const multipliedBase = q.baseTarget * multiplier
        const randomFactor = 0.8 + (Math.random() * 0.4) // 80% to 120%
        let target = Math.round(multipliedBase * randomFactor)
        if (target < 5) target = 5
        // Round to nearest 5 for aesthetic if it's large
        if (target > 10) target = Math.round(target / 5) * 5

        return {
          id: q.id,
          title: q.title,
          target: target,
          current: 0,
          unit: q.unit,
          icon: q.icon,
          baseTarget: q.baseTarget,
          statType: q.statType
        }
      })
      
      // Generate random rewards
      const expBase = 100 * multiplier
      const goldBase = 500 * multiplier
      const rewardRandomFactor = 0.8 + (Math.random() * 0.7) // 80% to 150%
      
      state.value.dailyRewards = {
        exp: Math.round((expBase * rewardRandomFactor) / 10) * 10,
        gold: Math.round((goldBase * rewardRandomFactor) / 50) * 50
      }
      
      state.value.profile.dailyDate = today
      state.value.rewardsClaimed = false
      await saveToFirestore()
    }
  }

  const addRepetition = async (questId, amount = 1) => {
    const quest = state.value.quests.find(q => q.id === questId)
    if (quest) {
      if (quest.current < quest.target) {
        // Only give stats if they haven't exceeded the target yet, 
        // to prevent farming infinite stats by spamming one exercise
        const actualAmount = Math.min(amount, quest.target - quest.current)
        
        const poolQuest = QUEST_POOL.find(q => q.id === questId)
        const baseTarget = quest.baseTarget || poolQuest?.baseTarget
        const statType = quest.statType || poolQuest?.statType

        if (baseTarget && statType && state.value.stats[statType] !== undefined) {
          const statGained = (actualAmount / baseTarget) * 0.15
          state.value.stats[statType] += statGained
        }
      }
      quest.current += amount
      await saveToFirestore()
    }
  }
  
  const finishExercise = async (questId, total) => {
     const quest = state.value.quests.find(q => q.id === questId)
     if (quest) {
        const newReps = total - quest.current
        if (newReps > 0 && quest.current < quest.target) {
           const actualAmount = Math.min(newReps, quest.target - quest.current)
           
           const poolQuest = QUEST_POOL.find(q => q.id === questId)
           const baseTarget = quest.baseTarget || poolQuest?.baseTarget
           const statType = quest.statType || poolQuest?.statType

           if (baseTarget && statType && state.value.stats[statType] !== undefined) {
             const statGained = (actualAmount / baseTarget) * 0.15
             state.value.stats[statType] += statGained
           }
        }
        quest.current = total
        await saveToFirestore()
     }
  }

  const allQuestsCompleted = computed(() => {
    return state.value.quests.every(q => q.current >= q.target)
  })

  const claimRewards = async () => {
    if (allQuestsCompleted.value && !state.value.rewardsClaimed) {
      const expReward = state.value.dailyRewards?.exp || 100
      const goldReward = state.value.dailyRewards?.gold || 500
      
      state.value.profile.exp += expReward
      state.value.profile.gold += goldReward
      state.value.rewardsClaimed = true
      
      if (state.value.profile.exp >= state.value.profile.maxExp) {
        state.value.profile.level++
        state.value.profile.exp -= state.value.profile.maxExp
        state.value.profile.maxExp = Math.floor(state.value.profile.maxExp * 1.5)
      }
      await saveToFirestore()
    }
  }

  const fetchLeaderboard = async () => {
    const { $db } = useNuxtApp()
    if (!$db) return []
    
    try {
      // Hapus data tiruan jika sebelumnya pernah di-inject
      const mockIds = ['mock_liu', 'mock_thomas', 'mock_baek', 'mock_choi']
      for (const mid of mockIds) {
        try {
          await deleteDoc(doc($db, 'hunters', mid))
        } catch(e) {}
      }

      const q = query(collection($db, 'hunters'), orderBy('profile.exp', 'desc'), limit(10))
      const querySnapshot = await getDocs(q)
      const leaderboard = []
      querySnapshot.forEach((doc) => {
        leaderboard.push({ id: doc.id, ...doc.data() })
      })
      
      return leaderboard
    } catch (error) {
      console.error("Error fetching leaderboard: ", error)
      return []
    }
  }

  const clearPenalty = async () => {
    state.value.profile.penaltyMessage = ''
    await saveToFirestore()
  }

  return {
    state,
    initLocalStorage: initFirestore, // Keep compatibility with existing pages
    initFirestore,
    addRepetition,
    finishExercise,
    allQuestsCompleted,
    claimRewards,
    fetchLeaderboard,
    checkAndResetDailyQuests,
    clearPenalty
  }
}
