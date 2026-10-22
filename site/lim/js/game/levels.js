define(["square", "triangle", "pentagon","circle", "pu_maxAmmo", "pu_maxSpeed", "pu_regenHealth", "pu_regenAmmo"],
    function(Square, Triangle, Pentagon, Circle, pu_maxAmmo, pu_maxSpeed, pu_regenHealth, pu_regenAmmo){
    var levels = [
        {
            mobs: [
                {
                    type: 'NEVER USED',
                    count: 5
                }
            ]
        },
        {
            // 1
            mobs: [
                {
                    type: Square,
                    count: 1
                }
            ],
            powerups: [
                {
                    type: pu_maxAmmo,
                    count: 1
                }
            ]
        },
        // 2
        {
            mobs: [
                {
                    type: Square,
                    count: 10
                }
            ],
            powerups: [
                {
                    type: pu_maxSpeed,
                    count: 1
                },
                {
                    type: pu_maxAmmo,
                    count: 1
                },
            ]
        },
        // 3
        {
            mobs: [
                {
                    type: Square,
                    count: 5
                },
                {
                    type: Triangle,
                    count: 3
                }
            ],
            powerups: [
                {
                    type: pu_maxSpeed,
                    count: 1
                },
            ]
        },
        // 4
        {
            mobs: [
                {
                    type: Circle,
                    count: 1
                },
                {
                    type: Triangle,
                    count: 5
                }
            ],
            powerups: [
                {
                    type: pu_maxAmmo,
                    count: 1
                },
                {
                    type: pu_maxSpeed,
                    count: 1
                },
            ]
        },
        // 5
        {
            mobs: [
                {
                    type: Circle,
                    count: 2
                },
                {
                    type: Triangle,
                    count: 10
                }
            ],
            powerups: [
                {
                    type: pu_maxSpeed,
                    count: 1
                },
                {
                    type: pu_regenAmmo,
                    count: 1
                },
            ]
        },
         // 6
        {
            mobs: [
                {
                    type: Square,
                    count: 10
                },
                {
                    type: Pentagon,
                    count: 5
                }
            ],
            powerups: [
                {
                    type: pu_maxSpeed,
                    count: 1
                },
                {
                    type: pu_maxAmmo,
                    count: 1
                },
            ]
        },
        // 7
        {
            mobs: [
                {
                    type: Square,
                    count: 10
                },
                {
                    type: Pentagon,
                    count: 5
                },
                {
                    type: Circle,
                    count:4
                }
            ],
            powerups: [
                {
                    type: pu_maxAmmo,
                    count: 1
                },
                {
                    type: pu_regenHealth,
                    count: 1
                },
            ]
        },
        // 8
        {
            mobs: [
                {
                    type: Square,
                    count: 10
                },
                {
                    type: Pentagon,
                    count: 5
                },
                {
                    type: Circle,
                    count: 4
                }
            ],
            powerups: [
                {
                    type: pu_maxSpeed,
                    count: 1
                },
                {
                    type: pu_maxAmmo,
                    count: 1
                },
                {
                    type: pu_regenAmmo,
                    count: 1
                },
            ]
        },
        // 9
        {
            mobs: [
                {
                    type: Square,
                    count: 10
                },
                {
                    type: Triangle,
                    count: 10
                },
                {
                    type: Pentagon,
                    count: 10
                },
                {
                    type: Circle,
                    count: 4
                }
            ],
            powerups: [
                {
                    type: pu_maxSpeed,
                    count: 1
                },
                {
                    type: pu_regenAmmo,
                    count: 1
                },
                {
                    type: pu_regenHealth,
                    count: 1
                },
            ]
        },
        // 10
        {
            mobs: [
                {
                    type: Square,
                    count: 50
                },
            ],
            powerups: [
                {
                    type: pu_maxSpeed,
                    count: 2
                },
                {
                    type: pu_maxAmmo,
                    count: 2
                },
                {
                    type: pu_regenHealth,
                    count: 2
                },
            ]
        },
        // 11
        {
            mobs: [
                {
                    type: Triangle,
                    count: 20
                },
                {
                    type: Circle,
                    count:4
                }
            ],
            powerups: [
                {
                    type: pu_regenHealth,
                    count: 2
                },
            ]
        },
        // 12
        {
            mobs: [
                {
                    type: Triangle,
                    count: 15
                },
                {
                    type: Pentagon,
                    count: 10
                },
                {
                    type: Circle,
                    count: 5
                },
            ],
            powerups: [
                {
                    type: pu_regenHealth,
                    count: 2
                },
            ]
        },
        // 13
        {
            mobs: [
                {
                    type: Pentagon,
                    count: 20
                },
                {
                    type: Square,
                    count: 20
                },
                {
                    type: Circle,
                    count: 6
                },
            ],
            powerups: [
                {
                    type: pu_maxSpeed,
                    count: 2
                },
                {
                    type: pu_regenHealth,
                    count: 1
                },
            ]
        },
        // 14
        {
            mobs: [
                {
                    type: Triangle,
                    count: 30
                },
                {
                    type: Square,
                    count: 20
                },
                {
                    type: Circle,
                    count: 6
                },
            ],
            powerups: [
                {
                    type: pu_maxSpeed,
                    count: 1
                },
                {
                    type: pu_regenHealth,
                    count: 1
                },
            ]
        },
        // 15
        {
            mobs: [
                {
                    type: Pentagon,
                    count: 30
                },
                {
                    type: Triangle,
                    count: 30
                },
                {
                    type: Square,
                    count: 30
                },
                {
                    type: Circle,
                    count:10
                }
            ],
            powerups: [
                {
                    type: pu_maxSpeed,
                    count: 2
                },
                {
                    type: pu_regenHealth,
                    count: 2
                },
                {
                    type: pu_maxAmmo,
                    count: 2
                },
            ]
        },
     ];

    return levels;
});