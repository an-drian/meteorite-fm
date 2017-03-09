import { Bert } from 'meteor/themeteorchef:bert';

const notify = (type, msg) => {
  const config = {
    message: msg,
    type: 'app-error',
    icon: type === 'app-error' ? 'fa-remove' : 'fa-check',
    style: 'growl-top-right',
  };
  Bert.alert(config);
};

export default notify;
