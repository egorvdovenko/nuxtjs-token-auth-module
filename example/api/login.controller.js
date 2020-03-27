export default function (req, res) {
  const data = JSON.stringify({
    token: 'token',
    refreshToken: 'refreshToken'
  })

  if (res.send) {
    res.send(data)
  } else {
    res.end(data)
  }
}
