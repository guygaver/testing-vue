import {mount} from 'vue-test-utils'
import expect from 'expect'
import Reminders from '../src/components/Reminders.vue'

describe('Reminders', () => {
    let wrapper;
    
    beforeEach(() => {
        wrapper = mount(Reminders);
    });
    
    it('hides the reminders list if there are none', () => {
        let wrapper = mount(Reminders);
        
        expect(wrapper.contains('ul')).toBe(false);
    });
    
    it('can add reminders', () => {
        addReminder('Go to the store');
        expect(remindersList()).toContain('Go to the store')
    });

    it('can remove any reminders', () => {
        addReminder('Doing something');
        addReminder('Getting some shit');
        
        let deleteButton = wrapper.find('ul > li:first-child .delete');
        deleteButton.trigger('click');

        expect(remindersList()).not.toContain('Doing something');
    });

    /**
     * Below we are able to organize and clean up our tests even more
     * by extracting common object checks to a function to easily pull them0
     */
    function addReminder(body) {
        let newReminder = wrapper.find('.new-reminder');

        newReminder.element.value = body;

        newReminder.trigger('input');

        wrapper.find('button').trigger('click');
    }
    
    function remindersList() {
        return wrapper.find('ul').text()
    }
});
