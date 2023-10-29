pub contract Confessions {

  pub var confessions: [String]

  pub fun addConfession(confessionToAdd: String) {
    self.confessions.append(confessionToAdd)
  }

  init() {
    self.confessions = []
  }
}
