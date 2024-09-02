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

  // {
  //   name: 'front-shoulders',
  //   path: `M 139 188
  //   Q 153 119, 209 136
  //   C 169 166, 188 170, 147 185 Z
  //   `,
  //   controlPoints: [
  //   ],
  // },

  // // Front Shoulders 2

  // {
  //   name: 'front-shoulders',
  //   path: `M 302.3 138 
  //   L 312 142
  //   Q 320 143, 313 166
  //   Q 355 186, 337 184.5
  //   Q 369.2 183, 356 190
  //   S 348 160.4, 337.5 148
  //   Q 347 127, 279 136 Z 
  //   `,
  //   controlPoints: [
  //   ],
  // },

  // {
  //   name: 'biceps',
  //   path: `M 140 188
  //   Q 95 245, 123 255
  //   Q 140 263, 162 222
  //   C 198 185, 148 182, 149 185 Z
  //   `,
  //   controlPoints: [
  //   ],

  // },

  // // Biceps 2

  // {
  //   name: 'biceps',
  //   path: `M 383 190 
  //   Q 342 176, 319 203
  //   Q 346 220, 333 230
  //   Q 388 262, 370 254
  //   Q 416 238, 367 210
  //   Q 390 195, 360 195 Z 
  //   `,
  //   controlPoints: [
  //   ],

  // },


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


  // {
  //   name: 'forearms',
  //   path: `M 143 251
  //   Q 113 269, 112 232
  //   L 108 237
  //   T 100 243
  //   C 100 243, 90 253, 76 283
  //   Q 59 318, 63 318
  //   Q 58 330, 78 328  
  //   S 97 307, 106 300
  //   Q 136 266, 135 256 Z
  //   `,
  //   controlPoints: [
  //   ],
  // },

  // {
  //   name: 'forearms',
  //   path: `M 380 252
  //   L 390 265
  //   Q 413 306, 406 319
  //   L 448 327.5
  //   Q 455 334, 427 319
  //   L 436 260
  //   Q 420 242, 376 228
  //   Q 410 268, 355 253 Z
  //   `,
  //   controlPoints: [
  //   ],
  // },

  

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
    Q 165 710, 162 717
    // Q 195 667, 192 635
    // L 212 623
    // Q 215 615, 197 585
    // L 210 573
    // S 180 595, 166 568 Z
    `,
    controlPoints: [],
  },
  
  
  

  // {
  //   name: 'calves',
  //   path: `M 304 538
  //   L 303 560
  //   Q 295 585, 286 600
  //   Q 320 640, 297 650
  //   Q 322 664, 321 657
  //   Q 344 650, 325 601
  //   Q 358 570, 318 530
  //   Q 335 528, 307 540
  //   Q 320 550, 285 538 Z

  //   ` 
  // }
]

const muscleBackMen: Muscle[] = [
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
