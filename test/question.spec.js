import {mount} from 'vue-test-utils'
import expect from 'expect'
import Question from './../src/components/Question.vue'
import moxios from 'moxios'

describe('Question', () => {
    let wrapper;

    beforeEach(() => {
        moxios.install();
        
        wrapper = mount(Question, {
            propsData: {
                dataQuestion: {
                    title: 'The title',
                    body: 'The body'
                }
            }
        })
    });

    afterEach(() => {
        moxios.uninstall();
    });

    it('presents the title and the body', () => {

        /**
         * below we are demonstarting a start for some helper functions.
         * We will potentially be viewing a lot of html so it would be easier to 
         * be able to use a function like see()
         */
        see('The title');
        see('The body');
    });

    it('can be edited', () => {
        expect(wrapper.contains('input[name=title]')).toBe(false);
        
        click('#edit');

        expect(wrapper.find('input[name=title]').element.value).toBe('The title');
        expect(wrapper.find('textarea[name=body]').element.value).toBe('The body');
    });

    it('hides the edit button during edit mode', () => {
        wrapper.find('#edit').trigger('click');
        expect(wrapper.contains('#edit')).toBe(false);
    });

    it('updates the question after being edited', () => {
        click('#edit');
        
        type('input[name=title]', 'Changed title');
        type('textarea[name=body]', 'Changed body');
        
        moxios.stubRequest('questions/1', {
            status: 200,
            response: {
                title: 'Changed title',
                body: 'Changed body',
            } 
        });
        
        click('#update');

        see('Changed title');
        see('Changed body');
        
        moxios.wait(() => {
            see('Your question has been updated');
            done();
        });
    });

    it('can cancel out of edit button', () => {
        click('#edit');

        type('input[name=title]', 'Changed title');

        click('#cancel');
        
        see('The title');
    });
    
    let see = (text, selector) => {
        let wrap = selector ? wrapper.find(selector) : wrapper;
        expect(wrap.html()).toContain(text);
    };

    let type = (selector, text) => {
        let node = wrapper.find(selector); 
        node.element.value = text;
        node.trigger('input');
    };

    let click = (selector) => {
        wrapper.find(selector).trigger('click');
    }
});