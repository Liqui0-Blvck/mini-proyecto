import imageUrlFrontMen from '../assets/muscles/front-anatomy-men-1.jpg';
import imageUrlBackMen from '../assets/muscles/back-anatomy-men.jpg';
import imageUrlFrontWomen from '../assets/muscles/front-anatomy-women.png';
import imageUrlBackWomen from '../assets/muscles/back-anatomy-women.png';
import { Muscle } from '../components/MuscleApi';


const muscleFrontMen: Muscle[] = [
  {
    name: 'traps',
    path: `M 230 113
    L 230 130
    Q 225 140, 205 141
    Q 200 135, 180 136
    Q 185 132, 207 121 Z
    `,
    controlPoints: [
    ],
  },

  // Traps 2
  {
    name: 'traps',
    path: `M 288 114
    L 288 130
    Q 290 140, 285 140
    Q 322 134, 308 137
    Q 328 131, 278 120 Z


    `,
    controlPoints: [
    ],
  },

  {
    name: 'chest',
    path: `M 258 150
    L 258 190
    Q 243 228, 186 215
    Q 184 212, 164 197
    Q 165 188, 148 191
    Q 164 190, 186 153
    Q 220 130, 240 145 Z 
    `,
    controlPoints: [
    ],
    controlColor: 'green'
  },

  // // Chest 2

  {
    name: 'chest',
    path: `M 259 150 
    L 259 190
    Q 273 228, 300 215
    Q 330 214, 326 194
    Q 357 190, 335 190
    Q 335 172, 302 155
    Q 308 132, 251 143 Z
    `,
    controlPoints: [
    ],
    controlColor: 'green'
  },

  {
    name: 'front-shoulders',
    path: `M 130 194
    Q 142 122, 203 141
    C 162 170, 182 177, 142 192 Z
    `,
    controlPoints: [],
},


  // // Front Shoulders 2

  {
    name: 'front-shoulders',
    path: `M 307.3 143 
    L 315 147
    Q 320 148, 316 171
    Q 358 191, 343 189.5
    Q 373 192, 360 195
    S 353 160.4, 344.5 153
    Q 352 130, 284 141 Z 
    `,
    controlPoints: [],
  },


  {
    name: 'biceps',
    path: `M 127 199
    Q 89 250, 108 265
    Q 126 278, 150 240
    Q 170 230, 165 215
    Q 179 180, 130 195 Z 

    // Q 140 263, 162 222
    // C 198 185, 148 182, 149 185 Z
    `,
    controlPoints: [
    ],

  },

  // // Biceps 2

  {
    name: 'biceps',
    path: `M 390 198 
    Q 343 180, 322 213
    Q 350 235, 342 244
    Q 384 275, 379 267
    Q 423 250, 368 205 Z

    `,
    controlPoints: [
    ],

  },


  {
    name: 'abdominals',
    path: `M 259 219 
    Q 259 205, 215 219
    Q 210 225, 211 242
    Q 220 290, 213 320
    Q 257.5 438, 276 318
    Q 298 265, 277.5 240
    Q 308 225, 269 218
    Q 275 210, 244 214 Z
     
    `,
  },

  
  {
    name: 'obliques',
    path: `M 170 197 
    Q 176 208, 162 225 
    Q 176 250, 178 265
    Q 194 280, 182.5 300
    L187 335 
    Q 225 335, 205 283
    S 205 252, 211 244
    L207 230 Z 
    `, 
    controlPoints: [
    ],
    controlColor: 'green'
  },

  // Obliques 2
  
  {
    name: 'obliques',
    path: `M 360 192 
    Q 338 200, 324 225
    Q 334 265, 307.5 270
    Q 325 280, 305 300
    L 330 334
    Q 297 340, 282 290
    Q 305 275, 278 248
    Q 292 238, 312 209 
    Q 350 190, 335 192 Z
    `, 
    controlPoints: [
    ],
    controlColor: 'green'
  },


  {
    name: 'forearms',
    path: `M 133 264
    Q 98 280, 105 235
    L 96 248
    Q 77 258, 50 338
    Q 45 352, 68 345
    Q 70 335, 98 316
    Q 110 305, 121 280
    L 133 264 Z 
    `,
    controlPoints: [
    ],
  },

  {
    name: 'forearms',
    path: `M 381 262
    L 395 280
    Q 413 316, 399 325
    Q 450 336, 422 348
    Q 470 350, 438 336
    L 445 275
    Q 425 248, 388 246
    L 412 236 
    Q 422 285, 355 263 Z 
    `,
    controlPoints: [
    ],
  },

  

  {
    name: 'quads',
    path: `M 187 335
    L 183 365
    Q 156 460, 164 500
    Q 175 546, 184 534
    S 189 529, 190 546 
    Q 219 572, 220 520
    L 237 495
    Q 262 430, 242 415
    Q 242 415, 220 370
    Q 220 345, 187 335 Z
    `,
    controlPoints: [
    ],
  },

  {
    name: 'quads',
    path: `M 331 335
    L 337 373
    Q 357 430, 324 505
    Q 342 540, 306 534
    Q 318 535, 298 545
    Q 308 570, 270 535
    L 280 493
    Q 260 457, 246 415
    Q 276 410, 267 375
    Q 292 351, 300 337 Z 
    `,
    controlPoints: [],
  },
  
  

  {
    name: 'calves',
    path: `M 172 565
    Q 157 602, 159 645
    Q 168 662, 163 700
    Q 165 710, 160 718
    Q 167 718, 148 740
    Q 130 757, 132 760
    Q 135 768, 138 766
    Q 140 770, 143 769
    Q 145 775, 149 770
    Q 160 780, 165 765
    Q 182 765, 175 750
    Q 202 745, 186 720
    Q 200 710, 189 705
    Q 191 695, 202 637
    Q 220 630, 203 575 
    Q 190 595, 172 569 Z
    `,
    controlPoints: [],
  },
  
  
  

  {
    name: 'calves',
    path: `M 305 576
    Q 295 630, 285 635
    Q 315 660, 299 690
    Q 318 720, 302 720
    L 322 736
    Q 320 745, 312 750
    Q 336 764, 322 766
    Q 358 780, 339 770
    Q 370 775, 345 768
    Q 379 772, 352 765
    Q 392 758, 340 740
    Q 365 735, 326 717
    Q 352 712, 325 700
    Q 345 695, 328 660
    Q 365 610, 320 565
    Q 335 573, 305 581
    Q 320 586, 291 580 Z 
    ` 
  }
]

const muscleBackMen: Muscle[] = [
  // {
  //   name: 'rear-shoulders',
  //   path: `M 128 187
  //   Q 145 130, 186 138
  //   Q 200 140, 200 148
  //   Q 200 158, 155 182
  //   Q 135 183, 128 187 Z
  //   `,
  //   controlPoints: [],
  // },

  // {
  //   name: 'rear-shoulders',
  //   path: `M 307 147
  //   Q 342 120, 355 165
  //   Q 390 180, 362 188
  //   Q 387 185, 330 180
  //   Q 340 175, 300 159 Z 
  //   `,
  //   controlPoints: [],
  // },


  // {
  //   name: 'traps',
  //   path: `M 220 122
  //   Q 190 132, 180 137
  //   Q 207 140, 202 150
  //   Q 218 156, 230 150
  //   Q 280 148, 270 152
  //   Q 300 157, 287 148
  //   Q 312 140, 310 135
  //   Q 316 126, 280 123
  //   Q 250 122, 214 122 Z  
    
  //   `,
  //   controlPoints: [], 
  // },

  // {
  //   name: 'triceps',
  //   path: `M 128 189
  //   Q 110 203, 105 220  
  //   Q 100 233, 98 235
  //   Q 90 245, 95 250
  //   Q 100 250, 105 248
  //   Q 115 246, 112 260
  //   Q 110 270, 125 263
  //   Q 145 247, 144 242
  //   Q 170 215, 160 205
  //   Q 160 190, 158 180
  //   Q 150 184, 140 184
  //   Q 135 184, 130 186 Z   
  //   `,
  // },

  // {
  //   name: 'triceps',
  //   path: `M 390 189
  //   Q 390 186, 349 184
  //   Q 350 182, 330 180
  //   Q 358 192, 328 208
  //   Q 347 218, 346 245
  //   Q 405 282, 376 255
  //   Q 402 245, 387 250
  //   Q 432 252, 382 220
  //   Q 410 210, 364 190 Z
  //   `,
  // },


  // {
  //   name: 'forearms',
  //   path: ` M 130 262
  //   Q 120 276, 112 284
  //   Q 100 305, 84 325
  //   Q 56 345, 61 355
  //   Q 35 360, 42 345
  //   Q 45 320, 62 290
  //   Q 64 272, 95 245
  //   Q 90 252, 105 249
  //   Q 112 245, 112 262
  //   Q 114 273, 128 260
  //   `
  // },

  // {
  //   name: 'forearms',
  //   path: ` M 390 262
  //   Q 390 266, 375 284
  //   Q 418 310, 404 325
  //   Q 462 350, 427 355
  //   Q 478 362, 446 345
  //   Q 474 320, 425 290
  //   Q 440 255, 392 245
  //   Q 430 254, 384 250
  //   Q 404 243, 375 260
  //   Q 405 275, 360 260 Z
  //   `
  // },

  {
    name: 'lats',
    path: `M 160 182
    Q 200 157, 200 149
    Q 264 225, 226 259
    Q 235 265, 215 285
    Q 220 290, 211 316
    Q 218 332, 200 330
    Q 190 340, 174 350
    
    `
  }, 
  {
    name: 'traps-middle',
    path:`` 
  },
  {
    name: 'lower-back',
    path: ``,
  },
  {
    name: 'glutes',
    path: ``
  },
  {
    name: 'hamstrings',
    path: ``	
  },
  {
    name: 'back-calves',
    path: ``
  }
]

const muscleFrontWomen: Muscle[] = [
  {
    name: 'calves',
    path: `M 304 538
    L 303 560
    Q 295 585, 286 600
    Q 320 640, 297 650
    Q 322 664, 321 657
    Q 344 650, 325 601
    Q 358 570, 318 530
    Q 335 528, 307 540
    Q 320 550, 285 538 Z
    `
  }
]

const muscleBackWomen: Muscle[] = [
  {
    name: 'calves',
    path: `M 304 538
    L 303 560
    Q 295 585, 286 600
    Q 320 640, 297 650
    Q 322 664, 321 657
    Q 344 650, 325 601
    Q 358 570, 318 530
    Q 335 528, 307 540
    Q 320 550, 285 538 Z
    `
  }
]



export const muscles = {
  men: {
    front: {
      imageUrl: imageUrlFrontMen,
      muscles: muscleFrontMen,
    },
    back: {
      imageUrl: imageUrlBackMen,
      muscles: muscleBackMen,
    },
  },
  women: {  // Changed "woman" to "women" for consistency
    front: {
      imageUrl: imageUrlFrontWomen,
      muscles: muscleFrontWomen,
    },
    back: {
      imageUrl: imageUrlBackWomen,
      muscles: muscleBackWomen,
    },
  },
};
