const successStoriesData = [
  {
    id: 1,
    image: require("../../assets/Success1.png"),
    coupleName: "Priya and Rahul",
    storyText:
      "Our love story began in January 2024 when we connected on RishtaConnect. Priya, a software engineer from Pune, and Rahul, a chartered accountant from Mumbai, instantly bonded over our shared passion for classical music and travel. Our first conversation lasted three hours as we discussed everything from ghazals to our favorite travel destinations.\n\nAfter months of daily video calls and weekend meetings between Pune and Mumbai, we knew we had found our soulmate. Both families met and immediately connected over shared values and traditions. Our engagement in June 2024 was a beautiful celebration with 200 guests, filled with music and blessings.\n\nToday, as a happily married couple living in Pune, we explore new destinations together every weekend and fill our home with classical music. RishtaConnect didn't just help us find a life partner - it helped us find our best friend. We're forever grateful for this platform that respects traditional values while embracing modern technology.",
  },
  {
    id: 2,
    image: require("../../assets/Success2.png"),
    coupleName: "Anjali and Vikram",
    storyText:
      "Distance is just a number when you find the right person. Dr. Anjali from Delhi and Vikram, an IT professional from Bangalore, met through RishtaConnect in March 2024. Despite being in different cities, we connected instantly over our love for literature and social work. Our first call lasted three hours discussing our favorite authors and volunteer experiences.\n\nWe made the long-distance work through daily video calls and bi-weekly visits. Both families met in Delhi after six months and were impressed by our commitment and the genuine connection we had built. What started as online conversations turned into a beautiful relationship based on trust, respect, and shared values.\n\nOur December 2024 wedding was a grand three-day celebration blending North and South Indian traditions. Today, settled in Bangalore, we continue our passion for social work together, running weekend literacy programs. RishtaConnect proved that true love transcends geographical boundaries.",
  },
  {
    id: 3,
    image: require("../../assets/Success3.png"),
    coupleName: "Sneha and Arjun",
    storyText:
      "Sneha, an English teacher from Hyderabad, and Arjun, a textile businessman from Chennai, found each other on RishtaConnect in February 2024. What drew us together was our shared commitment to preserving traditional values while embracing modern approaches. Our conversations ranged from Telugu poetry to traditional silk weaving techniques.\n\nDespite our busy schedules, we made time for daily video calls where we'd simply work together in comfortable silence. After four months, Arjun visited Hyderabad with traditional Kanchipuram sarees for my family - a gesture that won everyone's hearts. Both families immediately felt a strong connection rooted in similar middle-class values and cultural appreciation.\n\nOur October 2024 wedding in Chennai beautifully merged Telugu and Tamil traditions with 800 guests celebrating our union. Now we divide our time between both cities, with Sneha continuing to teach while helping with CSR initiatives for Arjun's textile business. RishtaConnect helped us find not just a spouse, but a partner who shares our dreams and values.",
  },
  {
    id: 4,
    image: require("../../assets/Success4.png"),
    coupleName: "Kavya and Rohan",
    storyText:
      "After years of unsuccessful matchmaking, Kavya, a fashion designer from Jaipur, and Rohan, an architect from Indore, found hope on RishtaConnect in April 2024. The platform's detailed compatibility filters helped us discover our shared creative passions. Our first conversation revealed an instant connection over design philosophies and sustainable practices.\n\nOur first meeting in Jaipur was magical - Rohan visited my design studio and was amazed by my work blending traditional Bandhani with modern silhouettes. I was equally impressed by his heritage building restoration portfolio. Both families, initially concerned about our demanding careers, were won over by our maturity and careful planning.\n\nOur December 2024 wedding was a designer's dream, featured in magazines for its unique blend of traditional and contemporary aesthetics. Today, we run a collaborative venture with Kavya designing traditional wear and Rohan creating concept stores. RishtaConnect matched not just our profiles, but our creative wavelengths perfectly.",
  },
  {
    id: 5,
    image: require("../../assets/Success1.png"),
    coupleName: "Divya and Karthik",
    storyText:
      "Divya, a bank manager from Kolkata, and Karthik, a software developer from Pune, connected through RishtaConnect in May 2024. Both of us had demanding careers but were looking for a partner who would understand professional pressures while valuing family life. The platform's advanced filters helped us find exactly what we were seeking.\n\nOur first Sunday evening call turned into a four-hour conversation covering careers, childhood memories, and dreams. We discovered we both lost our fathers young and were particularly close to our mothers. Despite the distance, we made it work through daily late-night video calls, sharing office stories and supporting each other through challenges.\n\nWhen Karthik visited Kolkata with his mother, both our families bonded over similar life journeys. Our November 2024 engagement was intimate and emotional, involving our mothers in every decision. We're planning our February 2025 wedding while already preparing for our life together - from finances to learning each other's regional cuisines. RishtaConnect gave our families the confidence through verified profiles and detailed backgrounds.",
  },
  {
    id: 6,
    image: require("../../assets/Success2.png"),
    coupleName: "Meera and Aditya",
    storyText:
      "Finding the right partner seemed impossible for Meera, a corporate lawyer from Mumbai, and Aditya, a civil engineer from Ahmedabad, until they joined RishtaConnect in June 2024. Both career-oriented professionals appreciated the platform's verified profiles and privacy features that made the search process secure and efficient.\n\nOur compatibility was evident from the first conversation - we both valued independence, ambition, and family traditions equally. Despite hectic work schedules, we made time for each other through weekend visits and constant communication. What started as professional respect grew into deep emotional connection over shared goals and values.\n\nBoth families were delighted with our match, appreciating how well we understood each other's career demands while maintaining strong family bonds. Our engagement in November 2024 was a joyous celebration. Today, as we plan our dream wedding, we're grateful to RishtaConnect for helping us find not just partners, but teammates for life's journey.",
  },
  {
    id: 7,
    image: require("../../assets/Success3.png"),
    coupleName: "Riya and Sameer",
    storyText:
      "Riya, a marketing professional from Lucknow, and Sameer, a government officer from Bhopal, met through RishtaConnect in July 2024. What made our connection special was how the platform respected traditional values while providing modern convenience. The detailed family backgrounds gave both our families confidence from the very beginning.\n\nOur conversations revealed perfect alignment in life goals - we both wanted stable careers, strong family connections, and a balanced approach to modern and traditional living. Regular video calls and family involvement made our relationship grow stronger. Both families appreciated the transparency and genuine nature of profiles on RishtaConnect.\n\nOur September 2024 wedding was a beautiful blend of our regional traditions with close family and friends. Today, settled in Bhopal, we're building our life together while staying connected to both families. RishtaConnect didn't just help us find partners - it helped our families find confidence in modern matrimonial platforms.",
  },
  {
    id: 8,
    image: require("../../assets/Success4.png"),
    coupleName: "Ishita and Nikhil",
    storyText:
      "Ishita, a physiotherapist from Chandigarh, and Nikhil, a mechanical engineer from Surat, crossed paths on RishtaConnect in August 2024. The platform's user-friendly interface and genuine matches made our search simple and enjoyable. We both had tried other platforms before but found RishtaConnect's approach more professional and trustworthy.\n\nOur connection was instant - we bonded over shared interests in fitness, healthy living, and family values. Despite being from different states, we found beautiful compatibility in our life philosophies and future goals. The excellent customer support team helped address our families' queries, making everyone comfortable with the process.\n\nAfter four months of getting to know each other and our families, we got married in December 2024 in a beautiful ceremony in Chandigarh. Today, as we start our new journey together in Surat, we often recommend RishtaConnect to friends and colleagues. Thank you for changing our lives and making our dream of finding the perfect life partner come true!",
  },
];

export default successStoriesData;