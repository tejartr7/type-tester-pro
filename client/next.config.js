/** @type {import('next').NextConfig} */
module.exports = {
  async redirects() {
    return [
      {
        source: "/temp/:consent*",
        destination: "https://yengmqycyifyofgvaqqp.supabase.co/:consent*",
        permanent: false,
      },
    ];
  },
};
