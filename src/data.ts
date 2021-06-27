export const unitData = {
	name: 'Unit ',
	components: [
		{
			description: '',
			quantity: 0,
			raise: 0,
			units: '',
			vendors: [
				{
					workType: '',
					vendorCategory: '',
					heading: '',
					description: '',
					quantity: 0,
					raise: 0,
					units: '',
				},
			],
			material: [
				{
					name: 'Carpenter',
					item: '',
					specification: '',
				},
				{
					name: 'Plywood',
					item: '',
					rate: 0,
				},
			],
			milestones: [
				{
					name: '',
					percentage: 0,
				},
			],
		},
	],
}
export const componentData = {
	description: '',
	quantity: 0,
	raise: 0,
	units: '',
	vendors: [
		{
			workType: '',
			vendorCategory: '',
			heading: '',
			description: '',
			quantity: 0,
			raise: 0,
			units: '',
		},
	],
	material: [
		{
			name: 'Carpenter',
			item: '',
			specification: '',
		},
		{
			name: 'Plywood',
			item: '',
			rate: 0,
		},
	],
	milestones: [
		{
			name: '',
			percentage: 0,
		},
	],
}
export const vendorData = {
	workType: '',
	vendorCategory: '',
	heading: '',
	description: '',
	quantity: 0,
	raise: 0,
	units: '',
}

export const data = [
	{
		name: 'Room 1',
		units: [
			{
				name: 'Unit 1',
				components: [
					{
						description: '',
						quantity: 0,
						raise: 0,
						units: '',
						vendors: [
							{
								workType: '',
								vendorCategory: '',
								heading: '',
								description: '',
								quantity: 0,
								raise: 0,
								units: '',
							},
						],
						material: [
							{
								name: 'Carpenter',
								item: '',
								specification: '',
							},
							{
								name: 'Plywood',
								item: '',
								rate: 0,
							},
						],
						milestones: [
							{
								name: '',
								percentage: 0,
							},
						],
					},
				],
			},
			{
				name: 'Unit 2',
				components: [
					{
						description: '',
						quantity: 0,
						raise: 0,
						units: '',
						vendors: [
							{
								workType: '',
								vendorCategory: '',
								heading: '',
								description: '',
								quantity: 0,
								raise: 0,
								units: '',
							},
						],
						material: [
							{
								name: 'Carpenter',
								item: '',
								specification: '',
							},
							{
								name: 'Plywood',
								item: '',
								rate: 0,
							},
						],
						milestones: [
							{
								name: '',
								percentage: 0,
							},
						],
					},
				],
			},
		],
	},
	{
		name: 'Room 2',
		units: [
			{
				name: 'Unit 2',
				components: [
					{
						description: '',
						quantity: 0,
						raise: 0,
						units: '',
						vendors: [
							{
								workType: '',
								vendorCategory: '',
								heading: '',
								description: '',
								quantity: 0,
								raise: 0,
								units: '',
							},
						],
						material: [
							{
								name: 'Carpenter',
								item: '',
								specification: '',
							},
							{
								name: 'Plywood',
								item: '',
								rate: 0,
							},
						],
						milestones: [
							{
								name: '',
								percentage: 0,
							},
						],
					},
				],
			},
		],
	},
	{
		name: 'Room 3',
		units: [
			{
				name: 'Unit 3',
				components: [
					{
						description: '',
						quantity: 0,
						raise: 0,
						units: '',
						vendors: [
							{
								workType: '',
								vendorCategory: '',
								heading: '',
								description: '',
								quantity: 0,
								raise: 0,
								units: '',
							},
						],
						material: [
							{
								name: 'Carpenter',
								item: '',
								specification: '',
							},
							{
								name: 'Plywood',
								item: '',
								rate: 0,
							},
						],
						milestones: [
							{
								name: '',
								percentage: 0,
							},
						],
					},
				],
			},
		],
	},
]

export interface RoomType {
	name: string
	units: UnitType[]
}

export interface UnitType {
	name: string
	components: ComponentType[]
}

export interface ComponentType {
	description: string
	quantity: number
	raise: number
	units: string
	vendors: VendorType[]
	material: MaterialType[]
	milestones: MilestoneType[]
}

export interface VendorType {
	workType: string
	vendorCategory: string
	heading: string
	description: string
	quantity: number
	raise: number
	units: string
}

export interface MaterialType {
	name: string
	item: string
	specification?: string
	rate?: number
}

export interface MilestoneType {
	name: string
	percentage: number
}
