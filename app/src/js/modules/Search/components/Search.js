import { connect } from 'react-redux';
import { increment } from 'store/reducers/counter';

import './Search.styl';


@connect(state => ({ count: state.counter.count }), {
	increment
})
export default class Search extends React.Component {
	render() {
		return (
			<div class="Search">
				<button onClick={this.props.increment}>Give me +++</button>
				WOWOW
				<span class="value">{this.props.count}</span>
			</div>
		);
	}
}
