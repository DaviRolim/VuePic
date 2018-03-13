import Vue from 'vue';

// Pra criar uma diretiva são passados 2 argumentos, o nome e a funcao
Vue.directive('my-transform', {
    bind(el, binding, vnode) {
        let current = 0;

        el.addEventListener('dblclick', function () {
            let incremento = binding.value.incremento || 90;
            let efeito;

            if (!binding.arg || binding.arg == 'rotate') {

                if (binding.value.reverse) {
                    current -= incremento;
                } else {
                    current += incremento;
                }
                efeito = `rotate(${current}deg)`;
            } else if (binding.arg == 'scale') {
                efeito = `scale(${incremento})`;
            }
            console.log(efeito);
            console.log(incremento);
            el.style.transform = efeito;
            if (binding.modifiers.animate) el.style.transition = 'transform 0.5s';
        });
    }
});