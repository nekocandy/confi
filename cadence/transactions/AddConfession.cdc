import "Confessions"

transaction(confession: String) {

  prepare(acct: AuthAccount) {
    log(acct.address)
  }

  execute {
    Confessions.addConfession(confessionToAdd: confession)
  }
}
