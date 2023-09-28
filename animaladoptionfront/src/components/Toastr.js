import { toastr } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

toastr.options = {
    "closeButton": false,
    "debug": false,
    "newestOnTop": true,
    "progressBar": true,
    "positionClass": "toast-top-right",
    "preventDuplicates": true,
    "showDuration": "300",
    "hideDuration": "1000",
    "timeOut": "5000",
    "extendedTimeOut": "1000",
    "showEasing": "swing",
    "hideEasing": "linear",
    "showMethod": "fadeIn",
    "hideMethod": "fadeOut"
  }

function showSuccessMessage(message) {
    toastr.success(message);
  }
  
  function showErrorMessage(message) {
    toastr.error(message);
  }
  
  function showWarningMessage(message) {
    toastr.warning(message);
  }
  
  function showInfoMessage(message) {
    toastr.info(message);
  }
  

