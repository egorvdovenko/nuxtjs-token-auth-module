export default function (req, res) {
  const data = JSON.stringify({
    token: 'newToken',
    refreshToken: 'newRefreshToken'
  })

  if (res.send) {
    res.send(data)
  } else {
    res.end(data)
  }
}
