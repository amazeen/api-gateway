const expect = require('chai').expect
const jwt = require('jsonwebtoken')

const { stripPrefix, getJwtData, verifyJwt } = require('../utils')

describe('utils module', function () {
    describe('stripPrefix()', function () {
        it('should remove prefix', function () {
            const str = '/prefix/data/'
            const prefix = '/prefix'
            expect(stripPrefix(str, prefix)).to.equal('/data/')
        })

        it('should leave str untouched the prefix is empty', function () {
            const str = '/prefix/data/'
            const prefix = ''
            expect(stripPrefix(str, prefix)).to.equal('/prefix/data/')
        })

        it('should leave str untouched when prefix is not in str', function () {
            const str = '/prefix/data/'
            const prefix = '/wrongprefix'
            expect(stripPrefix(str, prefix)).to.equal('/prefix/data/')
        })

        it('should leave str untouched when prefix is null', function () {
            const str = '/prefix/data/'
            const prefix = null
            expect(stripPrefix(str, prefix)).to.equal('/prefix/data/')
        })

        it('should leave str untouched when prefix is undefined', function () {
            const str = '/prefix/data/'
            const prefix = null
            expect(stripPrefix(str, prefix)).to.equal('/prefix/data/')
        })

        it('shouldremove only the first occurrence of prefix', function () {
            const str = '/prefix/data/prefix'
            const prefix = '/prefix'
            expect(stripPrefix(str, prefix)).to.equal('/data/prefix')
        })
    })

    describe('getJwtData()', function() {
        it('should extract the correct jwt data', function () {
            const data = {user: 'user', roles: ['read', 'write']}
            const token = jwt.sign(JSON.stringify(data), 'secret')
            const header = 'Bearer ' + token 
            expect(getJwtData(header)).to.eql(data)
        })
    })

    describe('verifyJwt()', function () {})
})
