import {mount} from 'vue-test-utils'
import Counter from '../src/components/CounterSinglePageComponent.vue'
import expect from 'expect'


/**
 * Concepts and apis learned in this portion
 * 
 * wrapper.setData is a way for us to set  
 */

describe('Counter', () => {
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

    it('decrements the count when the decrement button is clicked', () => {
        
        wrapper.setData({
            count: 5
        });
        
        wrapper.find('button.decrement').trigger('click');
        expect(wrapper.vm.count).toBe(4);
    });
    
    it('never goes below 0', () => {
        
        expect(wrapper.find('.decrement').hasStyle('display', 'none')).toBe(true);
        
        wrapper.find('button.increment').trigger('click');

        expect(wrapper.find('.decrement').hasStyle('display', 'none')).toBe(false);
        
        expect(wrapper.vm.count).toBe(1);
    });

    it('presents the current count', () => {
        expect(wrapper.find('.count').html()).toContain(0)
    });
});