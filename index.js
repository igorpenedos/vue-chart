import Test from './src/components/Test.vue'
import PieChartComponent from './src/components/PieChart.vue'

// Declare install function executed by Vue.use()
export function install(Vue) {
	if (install.installed) return;
	install.installed = true;
	Vue.component('Test', './src/components/Test.vue');
}

// Create module definition for Vue.use()
const plugin = {
	install,
};

// Auto-install when vue is found (eg. in browser via <script> tag)
let GlobalVue = null;
if (typeof window !== 'undefined') {
	GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
	GlobalVue = global.Vue;
}
if (GlobalVue) {
	GlobalVue.use(plugin);
}

// To allow use as module (npm/webpack/etc.) export component
export const TestMsg = function(){
	console.log("Package is working")
};

export const TestComponent = Test;

export const PieChart = PieChartComponent; 