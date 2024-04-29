import { type Court } from "@/types/types"

interface Courts {
  [key: string]: Court
}

export const COURTS = {
  MOBILE: {
    id: "court-mobile",
    name: "Court Mobile",
    title: "Mobile Court",
    subtitle: "The first patented mobile court in the market",
    description: "<p>Designed and engineered by our Engineering department, this court is patented by Portico Sport, being the first of its kind in the market. Thanks to this court, the client can save on ground preparation expenses and permit acquisition, as only a drained surface is needed to prevent water accumulation. This court model is built with a special counterweight box system as support, eliminating the need for ground anchoring. This allows sports practice in a specific location for an extended period, making it suitable for permanent use over the years, or it can be easily moved to another location. Additionally, its special counterweight box system makes it a highly resistant court that can withstand strong gusts of wind. If you're looking for a court that offers the possibility of mobility, the mobile court is the best choice.</p>",
    littleDescription: "<p>The first patented mobile court in the market designed and engineered by our Engineering department. This allows sports practice in a specific location for an extended period, making it suitable for permanent use over the years, or it can be easily moved to another location. If you're looking for a court that offers the possibility of mobility, the mobile court is the best choice.</p>",
    images: [{
      "src": "courts-detail/mobile/mobile-1.webp",
      "height": 767,
      "width": 1152,
      "alt": "Riverside Sports Club in New Zealand"
    },
    {
      "src": "courts-detail/mobile/mobile-2.webp",
      "height": 767,
      "width": 1152,
      "alt": "Vilshärads padel in Sweden"
    },
    {
      "src": "courts-detail/mobile/mobile-3.webp",
      "height": 767,
      "width": 1152,
      "alt": "Vilshärads padel in Sweden"
    },],
    features: [{
      title: "Mobility",
      description: "The court can be easily moved to another location.",
      icon: "mobile"
    }, {
      title: "Drained surface",
      description: "Only a drained surface is needed to prevent water accumulation.",
      icon: "drained"
    }, {
      title: "Counterweight box system",
      description: "This court's special counterweight box system as support eliminates the need for ground anchoring.",
      icon: "counterweight"
    }],
    projects: [{
      "src": "courts-detail/mobile/mobile-1.webp",
      "height": 767,
      "width": 1152,
      "alt": "Riverside Sports Club in New Zealand"
    }]
  }
} as Courts