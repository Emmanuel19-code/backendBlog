module.exports = {
  service:'gmail',
  auth: {
    user:`${process.env.email}`,
    pass:`${process.env.emailPassword}`
  },
};
