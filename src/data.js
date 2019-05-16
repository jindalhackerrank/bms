export default {
	CLUB: {
		price: 250,
		rows: [
            {
				row: 'A',
				seats: [
					{
						seatNumber: 1,
						status: "empty",
					},
					{
						seatNumber: 2,
						status:"empty"
					},
					{
						seatNumber: 3,
						status:"occupied"
					},
					{
						seatNumber: 4,
						status:"empty"
					},
					{
						seatNumber: 5,
						status:"empty"
                    },
                    {
						seatNumber: 6,
						status:"empty"
                    },
                    {
						seatNumber: 7,
						status:"empty"
					},
				],
            },
            {
				row: 'B',
				seats: [
					{
						seatNumber: 3,
						status:"empty"
					},
					{
						seatNumber: 4,
						status:"empty"
					},
					{
						seatNumber: 5,
						status:"empty"
                    },
                    {
						seatNumber: 6,
						status:"empty"
					},
					{
						seatNumber: 7,
						status:"empty"
					},
				],
            },
		],
	},
	EXECUTIVE: {
		price: 200,
		rows: [
			{
				row: 'A',
				seats: [
					{
						seatNumber: 1,
						status:"empty"
					},
					{
						seatNumber: 2,
						status:"empty"
					},
					{
						seatNumber: 3,
						status:"empty"
					},
				],
			},
		],
	},
};
