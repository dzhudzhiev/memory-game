const data = [];
for (let i = 1; i <= 18; i += 1) {
  data.push({ id: i, value: i, className: 'card' });
  data.push({ id: i + 18, value: i, className: 'card' });
}

export default data;
