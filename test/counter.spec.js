// mount is a utility which allows the mounting of a component in a headless dom
import {mount} from 'vue-test-utils'
// import Counter from '../src/components/Counter'
import Counter from '../src/components/Counter.js'
// expect is an assertion library similar to PHPUnits functionality
import expect from 'expect'

/**
 * Mocha tests are encapsulated within a "describe" method
 */
describe('Counter', () => {

    // In vue sometimes you will need to remount for each test and other times you wont.
    // in the case of counter we will initialize each time because we are keeping track of the count in certain tests
    let wrapper;

    beforeEach(() => {
        wrapper = mount(Counter)
    });

    it('defaults to a count of zero', () => {
        expect(wrapper.vm.count).toBe(0);
    });

    it('increments the count when the increment button is clicked', () => {
        expect(wrapper.vm.count).toBe(0);
        wrapper.find('button.increment').trigger('click');
        expect(wrapper.vm.count).toBe(1);
    });

    it('presents the current count', () => {
        expect(wrapper.find('.count').html()).toContain(0)
    });
});