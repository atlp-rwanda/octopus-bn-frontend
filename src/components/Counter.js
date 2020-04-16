import React from 'react';
import {connect } from 'react-redux';
import { increment, decrement } from '../redux/actions';

const counter = (props) => {
		return (
			<div style={{textAlign: 'center', display: 'inline-block'}}>
				<h1>Barefoot Nomad! change while setting up anything!!</h1>
				<h1>Our Genius Counter </h1>
				<input title="Increase" style={{fontSize: '20px'}} onClick={props.increment} type="button" value="+"/>&nbsp;
				<input title="Decrease"  style={{fontSize: '20px'}}  onClick={props.decrement} type="button" value="-"/>
				<h2> My Count is {props.count} </h2>
			</div>
		);
}
const mapStateToProps = ({counter}) => {
    return {
        count: counter
    }
}

const mapDispatchToProps = dispacth => {
    return {
        increment: () => dispacth(increment(1)),
        decrement: () => dispacth(decrement(1))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(counter);
