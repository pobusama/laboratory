import Vm_todoList from './vm_todoList';
import Vm_clock from './vm_clock';
import Vm_params from './vm_params';

class ViewModel {
    constructor() {
       Vm_todoList.apply(this);
       Vm_clock.apply(this);
       Vm_params.apply(this);
    }
}
export default ViewModel;
