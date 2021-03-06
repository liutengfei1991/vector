var expect = require('chai').expect
    , foo = 'bar'
    , beverages = { tea: ['chai', 'matcha', 'oolong'] };

import Vector from '../src/vector'

it('Creates vector correctly', () => {
    let a = new Vector(10, 20)

    expect(a.x).to.equal(10)
    expect(a.y).to.equal(20)
})

it('Checks constructor parameters', () => {
    expect(() => new Vector()).to.throw(Error, 'Must provide at least one parameter')
    expect(() => new Vector('z')).to.throw(Error, 'Single parameter should be a vector')
    expect(() => new Vector(10)).to.throw(Error, 'Single parameter should be a vector')
    expect(() => new Vector(10, 'z')).to.throw(Error, 'Must provide numeric parameters')
})

it('Creates vector from vector correctly', () => {
    let a = new Vector(30, 40)
    let b = new Vector(a)

    expect(b.x).to.equal(30)
    expect(b.y).to.equal(40)
})

it('Adds vectors', () => {
    let a = new Vector(10, 20)
    let b = new Vector(15, 40)
    let c = a.add(b)

    expect(c).to.be.an.instanceof(Vector).and.not.equal(a).and.not.equal(b)
    expect(c.x).to.equal(25)
    expect(c.y).to.equal(60)
})

it('Subtracts vectors', () => {
    let a = new Vector(25, 60)
    let b = new Vector(15, 40)
    let c = a.sub(b)

    expect(c).to.be.an.instanceof(Vector).and.not.equal(a).and.not.equal(b)
    expect(c.x).to.equal(10)
    expect(c.y).to.equal(20)
})

it('Negates vector', () => {
    let a = new Vector(25, -60)
    let b = a.neg()

    expect(b).to.be.an.instanceof(Vector).and.not.equal(a)
    expect(b.x).to.equal(-25)
    expect(b.y).to.equal(60)
})

it('Dot multiplies vectors', () => {
    let a = new Vector(2, 3)
    let b = new Vector(7, 9)

    expect(a.mul(b)).to.equal(41)
})

it('Multiplies vector by number', () => {
    let a = new Vector(2, 3)
    let b = a.mul(7)

    expect(b).to.be.an.instanceof(Vector)
    expect(b.x).to.equal(14)
    expect(b.y).to.equal(21)
})

it('Checks multiply parameters', () => {
    let a = new Vector(2, 3)
    expect(() => a.mul('abc')).to.throw(Error, 'Parameter should be a number or a vector')
})

it('Finds vector norm', () => {
    let a = new Vector(3, 4)

    expect(a.norm()).to.equal(5)
})

it('Creates unit vector', () => {
    let a = new Vector(3, 4)
    let u = a.unit()

    expect(u).to.be.an.instanceof(Vector).and.not.equal(a)
    expect(u.x).to.equal(3 / 5)
    expect(u.y).to.equal(4 / 5)
})

it('Rotates vector', () => {
    let a = new Vector(4, 3)
    let b = a.rotate(Math.PI / 2)

    expect(b).to.be.an.instanceof(Vector).and.not.equal(a)
    expect(b.x).to.be.closeTo(-3, 1e-10)
    expect(b.y).to.be.closeTo(4, 1e-10)
})

it('Calculates angle', () => {
    let a = new Vector(Math.sqrt(3) / 2, 0.5)

    expect(a.angle()).to.be.closeTo(Math.PI / 6, 1e-10)
})

it('Zero vector', () => {
    let z = Vector.zero()

    expect(z).to.be.an.instanceof(Vector)
    expect(z.x).to.equal(0)
    expect(z.y).to.equal(0)
})

it('Compares two vectors', () => {
    let a = new Vector(10, 20)

    expect(a.equals(new Vector(10, 20))).to.be.true
    expect(a.equals(new Vector((10 * Math.PI / 180) * 180 / Math.PI, 20))).to.be.true
    expect(a.equals(new Vector(10.001, 20.001), 0.01)).to.be.true

    expect(a.equals(new Vector(10, 22))).to.be.false
    expect(a.equals(new Vector(17, 20))).to.be.false
    expect(a.equals(40)).to.be.false
    expect(a.equals('z')).to.be.false
})

it('Clones vector', () => {
    let a = new Vector(10, 20)
    let b = a.clone()

    expect(b).to.be.an.instanceof(Vector).and.not.equal(a)
    expect(b.x).to.equal(10)
    expect(b.y).to.equal(20)
})

it('Converts radians to degrees', () => {
    expect(Vector.rad(30)).to.equal(Math.PI / 6)
})

it('Converts degrees to radians', () => {
    expect(Vector.deg(Math.PI / 6)).to.be.closeTo(30, 1e-10)
})