import { Bert } from 'meteor/themeteorchef:bert';
/*
 * @props: {
 *  type: 'app-error' || 'app-success';
 * }
 * */

const notify = (type, msg) => {
  const config = {
    message: msg,
    type,
    icon: type === 'app-error' ? 'fa-remove' : 'fa-check',
    style: 'growl-top-right',
  };
  Bert.alert(config);
};

export default notify;
