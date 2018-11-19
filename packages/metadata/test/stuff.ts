import 'chai/register-should'
import { skip, slow, suite, test, timeout } from 'mocha-typescript'
import {} from '../src'

@suite('Stuff')
export class Test {
  // @test.skip
  // async 'can be subclassed and methods decorated'() {
  //   const counter = new Counter()
  //   Event.emit('Increment', new Increment())
  //   await wait()
  //   counter.value.should.be.equal(1)
  // }
}
