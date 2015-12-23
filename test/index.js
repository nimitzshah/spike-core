import 'babel-core/register'
import path from 'path'
import fs from 'fs'
import rimraf from 'rimraf'
import test from 'ava'
import helpers from './_helpers'

test.afterEach.cb((t) => {
  rimraf(t.context.publicPath, t.end)
})

test('dump dirs', (t) => {
  return helpers.compileFixture(t, 'dump_dirs').then((res) => {
    let indexPath = path.join(t.context.publicPath, 'index.html')
    t.ok(Object.keys(res.compilation._modules)[1].match(/dump_dirs\/views\/index\.jade/))
    t.ok(fs.existsSync(indexPath))
    t.is(fs.readFileSync(indexPath, 'utf8'), '\n<p>hello world!</p>')
  })
})

test('ignores', (t) => {
  return helpers.compileFixture(t, 'ignores').then((res) => {
    let indexPath = path.join(t.context.publicPath, 'index.html')
    let aboutPath = path.join(t.context.publicPath, 'about.html')
    let layoutPath = path.join(t.context.publicPath, 'layout.html')

    t.ok(fs.existsSync(indexPath))
    t.ok(fs.existsSync(aboutPath))
    t.notOk(fs.existsSync(layoutPath))
  })
})
