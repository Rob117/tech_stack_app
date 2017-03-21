import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  View,
  LayoutAnimation
} from 'react-native';
import { CardSection } from './common';
import { connect } from 'react-redux';
// Import everything from a file
import * as actions from '../actions';

class ListItem extends Component {

  componentWillUpdate(){
    LayoutAnimation.spring();
  }
  
  renderDescription() {
    const { library, expanded } = this.props;
    if (expanded) {
      return (
        <CardSection>
          <Text style={{paddingLeft: 10}}>{library.description}</Text>
        </CardSection>
      )
    };
  }

  render() {
    const { titleStyle } = styles;
    const { id, title } = this.props.library
    return (
      <TouchableWithoutFeedback
          onPress={() => this.props.selectLibrary(id)}
        >
        <View>
          <CardSection>
            <Text style={titleStyle}>
              {title}
            </Text>
          </CardSection>
          {this.renderDescription()}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15
  }
};

// Own Props gets the props of the calling component
const mapStateToProps = (state, ownProps) => {
  const expanded = state.selectedLibraryId === ownProps.library.id;
  return { expanded };
};
// first arg = mapStateToProps, second = actions object
// Takes all of our actions and passes them to our item as props
export default connect(mapStateToProps, actions)(ListItem);
