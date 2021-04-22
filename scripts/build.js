const spawn = require('cross-spawn')

const target = process.argv[2]

if (!target) {
  console.log('target not exists')
} else {
  spawn('yarn', ['lerna', 'run', 'build', '--scope', target, '--stream'], { stdio: 'inherit' })
}
