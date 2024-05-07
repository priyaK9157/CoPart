import React from 'react';
import { Text } from 'react-native';

const TimeAgoText = ({ createdAt }) => {
  const timeDifference = (new Date() - new Date(createdAt)) / (1000 * 60 * 60); // Time difference in hours

  let timeAgoText = '';
  if (timeDifference < 1) {
    timeAgoText = 'Posted less than an hour ago';
  } else if (timeDifference < 24) {
    const hours = Math.floor(timeDifference);
    timeAgoText = `Posted ${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    const days = Math.floor(timeDifference / 24);
    timeAgoText = `Posted ${days} ${days === 1 ? 'day' : 'days'} ago`;
  }

  return <Text style={{ color: '#718096', fontSize: 12 }}>{timeAgoText}</Text>;
};

export default TimeAgoText;
