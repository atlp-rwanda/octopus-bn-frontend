import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import openSocket from 'socket.io-client';
import Grid from '@material-ui/core/Grid';
import '../../styles/chat.css';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Button from '@material-ui/core/Button';
import FlightTakeoffIcon from '@material-ui/icons/FlightTakeoff';
import $ from 'jquery';

const Chat = (props) => {
	const [ chatHistory, setChatHistory ] = useState([]);
	const [ message, setMessage ] = useState('');
	const token = localStorage.getItem('bn-token');
	const data = localStorage.getItem('bn-user-data');
	const { id } = JSON.parse(data);

	const socket = openSocket('https://octopus-bn-backend.herokuapp.com/', {
		query: {
			token
		}
	});

	// socket.on("authentication_error", function(error){
	//     all.style.display = 'none';
	// return  alert(error);
	// })

	// socket.on("custom_error", function(error){
	//   all.style.display = 'none';
	//   return  alert(error)
	// })

	useEffect(() => {
		socket.on('chat_history', function(data) {
			$('#messages').find('li').remove();
			data.filter(function(element) {
				const date = new Date(element.createdAt).toDateString();
				if (element.userId == id) {
					$('#messages').append(
						$('<li>').html(
							'<div><div class="message2">' +
								element.message +
								'<br/><div class="time">' +
								date +
								'</div> </div> <div class="by2">' +
								element.User.firstName +
								'.' +
								element.User.lastName +
								'</div></div>'
						)
					);
				} else {
					$('#messages').append(
						$('<li>').html(
							'<div><div class="message1">' +
								element.message +
								'<br/><div class="time2">' +
								date +
								'</div> </div> <div class="by">' +
								element.User.firstName +
								'.' +
								element.User.lastName +
								'</div></div>'
						)
					);
				}
			});
			$('#messages').animate(
				{
					scrollTop: $('#messages').prop('scrollHeight')
				},
				500
			);
		});
	}, []);
	socket.on('chat_message', function(element) {
		const date = new Date(element.createdAt).toDateString();
		if (element.userId == id) {
			$('#messages').append(
				$('<li>').html(
					'<div><div class="message2">' +
						element.message +
						'<br/><div class="time">' +
						date +
						'</div> </div> <div class="by2">' +
						element.User.firstName +
						'.' +
						element.User.lastName +
						'</div></div>'
				)
			);
		} else {
			$('#messages').append(
				$('<li>').html(
					'<div><div class="message1">' +
						element.message +
						'<br/><div class="time2">' +
						date +
						'</div> </div> <div class="by">' +
						element.User.firstName +
						'.' +
						element.User.lastName +
						'</div></div>'
				)
			);
		}
		$('#messages').animate(
			{
				scrollTop: $('#messages').prop('scrollHeight')
			},
			500
		);
	});
	socket.on('is_online', function(data) {
		$('#messages').append(
			$('<li>').html("<div class='is_online'> <i> " + data.username + ' Joined the chat...</i></div>')
		);
	});
	socket.on('is_offline', function(data) {
		$('#messages').append(
			$('<li>').html("<div class='is_offline'> <i> " + data.username + ' Left the chat...</i></div>')
		);
	});

	socket.emit('username');
	socket.emit('connected_clients', null, function(users) {
		$('#onlineList').empty();
		$.each(users, function(item) {
			$('#onlineList').append("<li> <p class='onlineStatus'></p> " + this.username + '</li>');
		});
	});
	socket.on('new_connected', function(users) {
		$('#onlineList').empty();
		$.each(users, function(item) {
			$('#onlineList').append("<li> <p class='onlineStatus'></p> " + this.username + '</li>');
			$('#messages').animate(
				{
					scrollTop: $('#messages').prop('scrollHeight')
				},
				500
			);
		});
	});
	socket.on('new_disconnected', function(users) {
		$('#onlineList').empty();
		$.each(users, function(item) {
			$('#onlineList').append("<li> <p class='onlineStatus'></p> " + this.username + '</li>');
			$('#messages').animate(
				{
					scrollTop: $('#messages').prop('scrollHeight')
				},
				500
			);
		});
	});

	const onSubmit = async (e) => {
		e.preventDefault();
		const value = $('#txt').val();
		if (value.length === 0 || !value.trim()) {
			return false;
		}
		socket.emit('chat_message', $('#txt').val());
		$('#txt').val('');
		return false;
	};

	return (
		<Grid container spacing={3}>
			<Grid item xs={4}>
				<div class="online">
					<div class="onlineTitle">
						<h1>Online Users</h1>
					</div>
					<ul id="onlineList" />
				</div>
			</Grid>
			<Grid item xs={8} spacing={3}>
				<div class="chat">
					<div class="title">
						<p>
							{' '}
							Hi,<b> </b> hope you are enjoying Barefoot chat feature
						</p>
					</div>
					<ul id="messages" />
					<form onSubmit={(e) => onSubmit(e)} id="form">
						<div className="inputBox">
							<div class="form">
								<div className="inputDiv">
									<input
										id="txt"
										class="input"
										autocomplete="off"
										autofocus="on"
										oninput="isTyping()"
										onKeyDown={(e) => (event.keyCode === 13 ? onSubmit(e) : null)}
										placeholder="type your message here..."
										required
									/>
									{/* <button>Send</button> */}
								</div>
							</div>
						</div>
					</form>
				</div>
			</Grid>
		</Grid>
	);
};

// Chat.propTypes = {
// 	window: PropTypes.func
// };

export default Chat;
