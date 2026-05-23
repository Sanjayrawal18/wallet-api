import ratelimit from '../config/upstash.js'

const rateLimiter = async (req, res, next) => {
  try {
    // I used 'my-rate-limiter' just for simplicity.
    const { success } = await ratelimit.limit("my-rate-limiter");

    if (!success) {
      return res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    }

    next();
  } catch (error) {
    console.log("Rate limit error", error);
    next(error);
  }
};

export default rateLimiter;
