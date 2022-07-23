function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHelath: 100,
      currentRound: 0,
      winner: null,
      logMessages: [],
    };
  },
  computed: {
    monsterBarStyle() {
      if (this.monsterHelath < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHelath + "%" };
    },
    playerBarStyle() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHelath <= 0) {
        this.winner = "draw";
      } else if (value < 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHelath = 100;
      this.currentRound = 0;
      this.winner = null;
      logMessages = [];
    },
    attackMonster() {
      this.currentRound++;
      const attackValue = getRandomValue(12, 5);
      this.monsterHelath -= attackValue;
      this.attackPlayer();
      this.addLogMessage("monster", "attack", attackValue);
    },
    attackPlayer() {
      const attackValue = getRandomValue(15, 8);
      this.playerHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
    },
    specialAttackPlayer() {
      this.currentRound++;
      const attackValue = getRandomValue(8, 25);
      this.monsterHelath -= attackValue;
      this.attackPlayer();
      this.addLogMessage("player", "attack", attackValue);
    },
    healPlayer() {
      this.currentRound++;
      const healValue = getRandomValue(8, 25);
      if (this.playerHealth + healValue > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += healValue;
      }
      this.attackPlayer();
      this.addLogMessage("player", "heal", attackValue);
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionValue: value,
      });
    },
  },
});
app.mount("#game");
