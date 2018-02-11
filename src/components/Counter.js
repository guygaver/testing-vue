export default {
    
    template: `
        <div>
            <span class="count" v-text="count"></span>
            <button @click="count += 1" class="increment"></button>
        </div>
    `,
    
    data() {
        return {
            count: 0
        }
    }
}