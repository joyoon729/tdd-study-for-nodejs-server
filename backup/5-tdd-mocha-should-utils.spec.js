// 파일명 중 'spec' 이 들어가면 테스트코드를 말한다. (specification)

/**
 * Mocha ?
 * 테스트 코드를 돌려주는 테스트 러너 
 * 테스트 수트: 테스트 환경. describe() 로 구현
 * 테스트 케이스: 실제 테스트. it() 으로 구현
 */


const utils = require('./5-tdd-mocha-should-utils.js');
const should = require('should');

// 테스트 수트를 만들기 위해 describe() 사용
describe('utils.js 모듈의 capitalize() 함수는 ', () => {
    it('문자열의 첫번째 문자를 대문자로 변환한다', () => {
        const result = utils.capitalize('hello');
        result.should.be.equal('Hello');
    })
})