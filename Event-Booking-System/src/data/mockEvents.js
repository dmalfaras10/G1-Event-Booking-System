const buildSeats = (row, count, soldIndices = [], holdIndices = []) => {
  return Array.from({ length: count }, (_, i) => {
    const num = i + 1;
    let status = 'available';
    if (soldIndices.includes(num)) status = 'sold';
    else if (holdIndices.includes(num)) status = 'hold';
    return {
      seatRow: row,
      seatNumber: num,
      code: `${row}-${num}`,
      status
    };
  });
};

export const eventCategories = [
  'Live Concert',
  'Classical & Gala',
  'Jazz & Lounge',
  'Nightlife & DJ'
];

export const mockEvents = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=900&q=80',
    name: 'Neon Noir Symphony: Manila Edition',
    artist: 'Nocturne Philharmonic & DJ Kaito',
    category: 'Live Concert',
    description: 'Experience an immersive nocturnal audiovisual takeover blending a 24-piece live string ensemble with deep melodic synth sets.',
    date: '2026-11-21T20:00:00',
    status: 'Upcoming',
    venueName: 'The Palace Pool Club',
    address: 'BGC, Taguig',
    venueCapacity: 120,
    tickets: [
      {
        ticketType: 'Sky-Deck VIP',
        ticketDescription: 'Includes Sky-Deck Lounge Access and priority bar service.',
        ticketPerks: ['Sky-Deck Lounge Access', 'Priority Bar Lane'],
        perksInput: 'Sky-Deck Lounge Access, Priority Bar Lane', // <-- Added missing comma here
        price: 4800.00,
        seatSection: 'VIP Deck',
        seatRow: 'A',
        quantity: 20,
        seats: buildSeats('A', 20, [1, 2, 3], [4, 5])
      },
      {
        ticketType: 'General Admission',
        ticketDescription: 'Standard floor access to the audiovisual zone.',
        ticketPerks: ['Standard Entry'],
        perksInput: 'Standard Entry',
        price: 2500.00,
        seatSection: 'Poolside GA',
        seatRow: 'B',
        quantity: 50,
        seats: buildSeats('B', 50, [1, 2, 6, 7, 8, 9, 10], [11, 12, 13])
      }
    ]
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?auto=format&fit=crop&w=900&q=80',
    name: 'Solitary Harmonics: Acoustic Piano Night',
    artist: 'Nils Frahm & Guests',
    category: 'Classical & Gala',
    description: 'An intimate three-hour improvisational performance on grand upright piano and vintage analog modular synthesizers.',
    date: '2026-11-28T19:30:00',
    status: 'Upcoming',
    venueName: 'Samsung Performing Arts Theater',
    address: 'Makati City',
    venueCapacity: 150,
    tickets: [
      {
        ticketType: 'Orchestra Center',
        ticketDescription: 'Direct acoustic sweet spot with unobstructed stage view.',
        ticketPerks: ['Acoustic Check Access', 'Program Booklet'],
        perksInput: 'Acoustic Check Access, Program Booklet',
        price: 3600.00,
        seatSection: 'Orchestra',
        seatRow: 'C',
        quantity: 40,
        seats: buildSeats('C', 40, [1, 2, 10, 11], [5, 6])
      }
    ]
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1566737236500-c8ac43014a67?auto=format&fit=crop&w=900&q=80',
    name: 'Winter Masquerade at The Fort',
    artist: 'Manila Chamber Quintet',
    category: 'Classical & Gala',
    description: 'Step into an evening of velvet elegance, Vivaldi Recomposed under candlelight, and curated four-course dinner pairings.',
    date: '2026-12-05T19:00:00',
    status: 'Upcoming',
    venueName: 'Shangri-La Grand Ballroom',
    address: 'BGC, Taguig',
    venueCapacity: 100,
    tickets: [
      {
        ticketType: 'Black Tie VIP Table',
        ticketDescription: 'Includes complimentary champagne and four-course dinner pairing.',
        ticketPerks: ['Complimentary Champagne', 'Four-course Dinner', 'Mask Included'],
        perksInput: 'Complimentary Champagne, Four-course Dinner, Mask Included',
        price: 8500.00,
        seatSection: 'Grand Tier',
        seatRow: 'VIP',
        quantity: 30,
        seats: buildSeats('VIP', 30, [1, 2, 3, 4, 5, 6, 7], [8, 9])
      }
    ]
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=900&q=80',
    name: 'Midnight Saxophone Salon',
    artist: 'The Harlem Speakeasy Quartet',
    category: 'Jazz & Lounge',
    description: 'An intimate 80-seat speakeasy jazz session featuring brass standards, private banquette service, and late-night jam sessions.',
    date: '2026-12-12T21:30:00',
    status: 'Upcoming',
    venueName: 'The Spirits Library',
    address: 'Makati City',
    venueCapacity: 80,
    tickets: [
      {
        ticketType: 'Banquette Seating',
        ticketDescription: 'Includes 1 rare single malt pairing and plush banquette seating.',
        ticketPerks: ['1 Rare Single Malt Pairing', 'Dedicated Server'],
        perksInput: '1 Rare Single Malt Pairing, Dedicated Server',
        price: 2800.00,
        seatSection: 'Speakeasy Lounge',
        seatRow: 'S',
        quantity: 25,
        seats: buildSeats('S', 25, [1, 2, 3, 4], [5, 6])
      }
    ]
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80',
    name: 'Velvet Indie Sessions: Where Time Goes',
    artist: 'The Coastal Drift Collective',
    category: 'Live Concert',
    description: 'Warm analog guitars and nostalgic indie rock anthems performed live in an acoustically engineered theater setting.',
    date: '2026-12-19T20:00:00',
    status: 'Upcoming',
    venueName: 'Solaire Theatre',
    address: 'Pasay City',
    venueCapacity: 160,
    tickets: [
      {
        ticketType: 'Mezzanine Circle',
        ticketDescription: 'Great sightlines with access to the vinyl merch booth area.',
        ticketPerks: ['Early Merch Booth Access', 'Signed Poster Voucher'],
        perksInput: 'Early Merch Booth Access, Signed Poster Voucher',
        price: 3000.00,
        seatSection: 'Mezzanine',
        seatRow: 'M',
        quantity: 50,
        seats: buildSeats('M', 50, [1, 2, 3], [4, 5, 6])
      }
    ]
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=900&q=80',
    name: '2027 Gold Champagne NYE Gala',
    artist: 'International Guest DJs & Pyro Symphony',
    category: 'Nightlife & DJ',
    description: 'Ring in 2027 poolside by Manila Bay inside the glass dome with international headliners and unlimited vintage bubbly.',
    date: '2026-12-31T21:00:00',
    status: 'Upcoming',
    venueName: 'Okada Manila Cove',
    address: 'Pasay City',
    venueCapacity: 200,
    tickets: [
      {
        ticketType: 'Gold VIP Dome Pass',
        ticketDescription: 'Unlimited vintage bubbly and front-row pyrotechnics view.',
        ticketPerks: ['Unlimited Vintage Bubbly', 'Midnight Pyro View', 'Valet Parking'],
        perksInput: 'Unlimited Vintage Bubbly, Midnight Pyro View, Valet Parking',
        price: 12000.00,
        seatSection: 'Dome VIP',
        seatRow: 'Z',
        quantity: 50,
        seats: buildSeats('Z', 50, Array.from({length: 50}, (_, i) => i + 1), [])
      }
    ]
  }
];