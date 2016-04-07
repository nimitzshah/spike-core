import {
  test,
  compileFixture,
  fixturesPath,
  fs,
  path,
  rimraf
} from './_helpers'

test.cb.beforeEach((t) => {
  rimraf(path.join(fixturesPath, 'loaders', 'public'), () => { t.end() })
})

test('compiles a project with a custom loader', (t) => {
  return compileFixture(t, 'loaders')
    .then(({publicPath}) => { return path.join(publicPath, 'js/main.js') })
    .tap((index) => { return fs.stat(index).tap(t.truthy.bind(t)) })
    .then((index) => { return fs.readFile(index, 'utf8') })
    .then((contents) => { return t.regex(contents, /overwritten from local loader/) })
})
