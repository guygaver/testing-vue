import {mount} from 'vue-test-utils'
import Coupon from '../src/components/CouponCode.vue'
import expect from 'expect'

describe('CouponCode', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = mount(Coupon);
    });
    
    it('accepts a coupon code', () => {
        expect(wrapper.contains('input.coupon-code')).toBe(true);
    });
    
    it('validates a user-provided coupon code', () => {
        enterCouponCode('50OFF');
        expect(wrapper.html()).toContain('50% Off');
    });


    /**
     * Below the test is checking for emitted events by calling the 
     * emitted() function under the wrapper. This is how we test for emitted events
     */
    it('broadcasts the percentage discount when a valid coupon code is applied', () => {
        enterCouponCode('50OFF');
        expect(wrapper.emitted().applied).toBeTruthy();
        expect(wrapper.emitted().applied[0]).toEqual([50]);
    });

    it('validates a fake coupon code', () => {
        enterCouponCode('NOTREAL');
        expect(wrapper.html()).toContain('Invalid Coupon Code');
    });

    function enterCouponCode(code) {
        let couponCode = wrapper.find('input.coupon-code');
        couponCode.element.value = code;
        couponCode.trigger('input');
    }
});
