export interface Design {
    id:          string;
    name:        string;
    description: string;
    image:       string;
    kitchens:    Kitchen[];
    contents:    Content[];
}

interface Content {
    id:    string;
    name:  string;
    image: string;
}

export interface Kitchen {
    id:     string;
    name:   string;
    photos: Photo[];
}

interface Photo {
    id:    string;
    image: string;
}
