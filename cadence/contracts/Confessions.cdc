pub contract Confessions {

  pub var confessions: [String]

  pub fun addConfession(confession: String) {
    self.confessions.append(confession)
  }

  init() {
    self.confessions = []
  }
}
