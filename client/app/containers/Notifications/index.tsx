import * as React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import compose from 'recompose/compose';

import { cyan500, pinkA200, red900, deepOrange500 } from 'material-ui/colors';

import { translate } from 'react-i18next';

import {
  selectError,
  makeQueryNotifications,
  selectLoading,
} from './selectors';

import Message from 'material-ui-icons/Message';

import ReactMaterialUiNotifications from 'react-materialui-notifications';

import * as moment from 'moment';

interface IProps {
  events?: any[];
  t?: any;
}

class Notifications extends React.Component<IProps, {}> {
  state: any = {
    count: 0,
  };

  constructor(props: any) {
    super(props);
  }

  componentWillReceiveProps(nextProps: any) {
    const events: any[] = nextProps.events;
    console.log('New props:', events);

    if (events && events.length > 0) {
      events.forEach(event => this.showNotification(event.entity));
    }
  }

  showNotification = (entity: any) => {
    ReactMaterialUiNotifications.showNotification({
      title: entity.type,
      additionalText: `${entity.actee_type} ${entity.actee_name}`,
      icon: <Message />,
      iconBadgeColor: deepOrange500,
      timestamp: moment().format('h:mm A'),
    });
    // update notifications count
    this.setState({
      count: ++this.state.count,
    });
  };

  public render() {
    return null;
  }
}

const mapStateToProps = createStructuredSelector({
  events: makeQueryNotifications(),
});

export default connect<{}, {}, IProps>(mapStateToProps, undefined)(
  translate()(Notifications),
);
