import { connect } from 'react-redux';
import { decrement } from 'store/reducers/counter';

import './Profile.styl';


@connect(state => ({ count: state.counter.count }), {
	decrement
})
export default class Profile extends React.Component {
	render() {
		return (
			<div class="Profile">
				<div class="Profile-pill">
					<button onClick={this.props.decrement}>Take <span class="value">{this.props.count}</span></button>
				</div>
			</div>
		);
	}
}
