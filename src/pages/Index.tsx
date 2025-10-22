import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import Icon from '@/components/ui/icon';
import QRCode from 'qrcode';

interface CartItem {
  product: Product;
  quantity: number;
}

interface ComparisonItem {
  product: Product;
}

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  features: string[];
  inStock: boolean;
  fullDescription?: string;
  specifications?: { [key: string]: string };
  warranty?: string;
  delivery?: string;
}

const products: Product[] = [
  {
    id: 1,
    name: 'IP-камера купольная 4MP',
    category: 'Видеонаблюдение',
    price: 12500,
    image: 'https://cdn.poehali.dev/projects/efe24ef9-f9e4-40ab-88ec-1ddb60c55c42/files/be591974-619d-4917-962c-ca355f18fbc3.jpg',
    description: 'Купольная IP-камера с разрешением 4 Мп для внутреннего наблюдения',
    features: ['4 Мп разрешение', 'ИК подсветка 30м', 'H.265+', 'PoE', 'Micro SD до 256 ГБ'],
    inStock: true,
    fullDescription: 'Профессиональная купольная IP-камера с разрешением 4 Мегапикселя обеспечивает высокое качество изображения для систем видеонаблюдения внутри помещений. Поддержка стандарта H.265+ позволяет экономить до 50% дискового пространства при сохранении качества видео. Встроенная ИК подсветка обеспечивает видимость до 30 метров в полной темноте.',
    specifications: {
      'Матрица': '1/3" Progressive Scan CMOS',
      'Разрешение': '2688×1520 (4 Мп)',
      'Объектив': '2.8мм фиксированный',
      'ИК подсветка': 'До 30м',
      'Сжатие': 'H.265+/H.265/H.264+/H.264',
      'Питание': 'PoE (802.3af), DC12В',
      'Рабочая температура': '-10°C ~ +60°C',
      'Защита': 'IP67'
    },
    warranty: '3 года официальной гарантии',
    delivery: 'Доставка по Москве — 1 день, по России — 3-5 дней'
  },
  {
    id: 2,
    name: 'IP-камера уличная 5MP',
    category: 'Видеонаблюдение',
    price: 15900,
    image: 'https://cdn.poehali.dev/projects/efe24ef9-f9e4-40ab-88ec-1ddb60c55c42/files/e72a27a9-2ffd-4bba-82f6-4c530fd54d0f.jpg',
    description: 'Уличная IP-камера с защитой IP67 и ночным видением',
    features: ['5 Мп разрешение', 'ИК подсветка 50м', 'IP67', 'WDR 120дБ', 'Моторизованный объектив'],
    inStock: true,
    fullDescription: 'Всепогодная уличная IP-камера с высоким разрешением 5 Мп предназначена для круглосуточного наблюдения на открытых территориях. Моторизованный варифокальный объектив позволяет удаленно настраивать угол обзора. Технология WDR 120дБ обеспечивает четкое изображение в условиях контрастного освещения.',
    specifications: {
      'Матрица': '1/2.7" Progressive Scan CMOS',
      'Разрешение': '2560×1944 (5 Мп)',
      'Объектив': '2.8-12мм моторизованный',
      'ИК подсветка': 'До 50м',
      'WDR': '120дБ',
      'Питание': 'PoE (802.3af), DC12В',
      'Рабочая температура': '-40°C ~ +60°C',
      'Защита': 'IP67, IK10'
    },
    warranty: '3 года официальной гарантии',
    delivery: 'Доставка по Москве — 1 день, по России — 3-5 дней'
  },
  {
    id: 3,
    name: 'Видеорегистратор NVR 16 каналов',
    category: 'Видеонаблюдение',
    price: 28500,
    image: 'https://cdn.poehali.dev/projects/efe24ef9-f9e4-40ab-88ec-1ddb60c55c42/files/00f93d2e-b987-49f8-b67d-26de9b801a5b.jpg',
    description: 'Сетевой видеорегистратор на 16 каналов с поддержкой 4K',
    features: ['16 каналов', 'Запись до 8K', 'HDD до 8 ТБ', 'HDMI 4K', 'P2P доступ'],
    inStock: true,
    fullDescription: 'Профессиональный сетевой видеорегистратор для построения систем IP-видеонаблюдения до 16 камер. Поддержка записи в сверхвысоком разрешении до 8K, встроенная технология интеллектуальной видеоаналитики. Удаленный доступ через мобильное приложение и веб-интерфейс.',
    specifications: {
      'Каналов видео': '16 IP-камер',
      'Разрешение записи': 'До 8 Мп на канал',
      'Входящая скорость': 'До 160 Мбит/с',
      'Жесткие диски': 'До 2×8 ТБ SATA',
      'Видеовыходы': 'HDMI 4K, VGA',
      'Сеть': 'RJ45 10/100/1000 Мбит/с',
      'PoE': 'Нет (требуется внешний коммутатор)',
      'Питание': 'DC12В/4А'
    },
    warranty: '2 года официальной гарантии',
    delivery: 'Доставка по Москве — 1 день, по России — 3-5 дней'
  },
  {
    id: 4,
    name: 'Панель управления охранная',
    category: 'Охранные системы',
    price: 19900,
    image: 'https://cdn.poehali.dev/projects/efe24ef9-f9e4-40ab-88ec-1ddb60c55c42/files/fac51a00-1a29-44f5-a50c-85d204887143.jpg',
    description: 'Беспроводная панель управления с GSM модулем',
    features: ['32 зоны', 'GSM/GPRS', 'Мобильное приложение', 'SMS оповещения', '2 года автономии'],
    inStock: true
  },
  {
    id: 5,
    name: 'Датчик движения PIR',
    category: 'Охранные системы',
    price: 2500,
    image: 'https://cdn.poehali.dev/projects/efe24ef9-f9e4-40ab-88ec-1ddb60c55c42/files/c8f61573-9f26-4403-9d59-328e7f472f78.jpg',
    description: 'Беспроводной PIR датчик с защитой от животных',
    features: ['Радиус 12м', 'Угол 90°', 'Защита от животных', 'Батарея 3 года', 'Температура -10..+55°C'],
    inStock: true
  },
  {
    id: 6,
    name: 'Считыватель RFID',
    category: 'Контроль доступа',
    price: 8900,
    image: 'https://cdn.poehali.dev/projects/efe24ef9-f9e4-40ab-88ec-1ddb60c55c42/files/c8f61573-9f26-4403-9d59-328e7f472f78.jpg',
    description: 'Считыватель карт доступа с клавиатурой',
    features: ['RFID 125кГц', 'PIN-код', 'IP65', 'Wiegand 26/34', 'LED индикация'],
    inStock: false
  },
  {
    id: 7,
    name: 'Кондиционер инверторный 12000 BTU',
    category: 'Кондиционеры',
    price: 45900,
    image: 'https://cdn.poehali.dev/projects/efe24ef9-f9e4-40ab-88ec-1ddb60c55c42/files/5121aed5-91b9-405a-a7d2-625eed16f69a.jpg',
    description: 'Инверторный кондиционер для помещений до 35 м²',
    features: ['12000 BTU', 'Инвертор', 'Wi-Fi управление', 'Класс A+++', 'Тихий режим 19 дБ'],
    inStock: true,
    fullDescription: 'Современный инверторный кондиционер с высокой энергоэффективностью класса A+++. Технология инвертора обеспечивает плавную регулировку мощности, экономию до 40% электроэнергии и бесшумную работу. Встроенный Wi-Fi модуль позволяет управлять климатом через мобильное приложение из любой точки мира.',
    specifications: {
      'Мощность охлаждения': '3.5 кВт (12000 BTU)',
      'Мощность обогрева': '4.0 кВт',
      'Площадь помещения': 'До 35 м²',
      'Энергоэффективность': 'A+++ (охлаждение), A++ (обогрев)',
      'Уровень шума (внутренний)': '19-38 дБ',
      'Уровень шума (наружный)': '52 дБ',
      'Хладагент': 'R32',
      'Режимы': 'Охлаждение, обогрев, осушение, вентиляция, авто'
    },
    warranty: '3 года официальной гарантии производителя',
    delivery: 'Доставка по Москве — бесплатно, установка — от 8000₽'
  },
  {
    id: 8,
    name: 'Кондиционер кассетный 24000 BTU',
    category: 'Кондиционеры',
    price: 89900,
    image: 'https://cdn.poehali.dev/projects/efe24ef9-f9e4-40ab-88ec-1ddb60c55c42/files/b99d5ccd-317e-44c9-93f2-568d9342708e.jpg',
    description: 'Кассетный кондиционер для офисов и коммерческих помещений',
    features: ['24000 BTU', '4-х сторонний обдув', 'Площадь до 70м²', 'Пульт с дисплеем', 'Фильтр PM2.5'],
    inStock: true,
    fullDescription: 'Профессиональный кассетный кондиционер для установки в подвесной потолок. Четырехсторонний обдув обеспечивает равномерное распределение воздуха по всему помещению. Идеально подходит для офисов, магазинов, кафе и других коммерческих объектов площадью до 70 м².',
    specifications: {
      'Мощность охлаждения': '7.0 кВт (24000 BTU)',
      'Мощность обогрева': '8.0 кВт',
      'Площадь помещения': 'До 70 м²',
      'Энергоэффективность': 'A++ (охлаждение), A+ (обогрев)',
      'Уровень шума (внутренний)': '32-44 дБ',
      'Размер панели': '840×840 мм',
      'Хладагент': 'R410A',
      'Воздухообмен': '1200 м³/ч'
    },
    warranty: '3 года официальной гарантии производителя',
    delivery: 'Доставка и монтаж по Москве — от 15000₽, по России — расчет индивидуально'
  },
  {
    id: 9,
    name: 'Кондиционер мобильный 9000 BTU',
    category: 'Кондиционеры',
    price: 28900,
    image: 'https://cdn.poehali.dev/projects/efe24ef9-f9e4-40ab-88ec-1ddb60c55c42/files/f55db7f7-c3ec-44d4-9b16-0524e387597f.jpg',
    description: 'Мобильный кондиционер без необходимости монтажа',
    features: ['9000 BTU', 'Без монтажа', 'Колесики', 'Осушение', 'Пульт ДУ'],
    inStock: true,
    fullDescription: 'Мобильный кондиционер — идеальное решение для съемных помещений, дач и временного охлаждения. Не требует профессионального монтажа, легко перемещается между комнатами благодаря колесикам. Достаточно вывести гибкий воздуховод в окно или дверь.',
    specifications: {
      'Мощность охлаждения': '2.6 кВт (9000 BTU)',
      'Площадь помещения': 'До 25 м²',
      'Энергоэффективность': 'Класс A',
      'Уровень шума': '52-65 дБ',
      'Объем бака': '1.2 л',
      'Хладагент': 'R290',
      'Габариты': '335×750×360 мм',
      'Вес': '26 кг'
    },
    warranty: '2 года официальной гарантии',
    delivery: 'Доставка по Москве — 1 день, по России — 3-5 дней'
  },
  {
    id: 10,
    name: 'Кондиционер канальный 18000 BTU',
    category: 'Кондиционеры',
    price: 67500,
    image: 'https://cdn.poehali.dev/projects/efe24ef9-f9e4-40ab-88ec-1ddb60c55c42/files/81d31a9f-8881-44a3-aaf6-b4c288bb5f0d.jpg',
    description: 'Канальный кондиционер для скрытого монтажа',
    features: ['18000 BTU', 'Скрытая установка', 'Площадь до 50м²', 'Низкий уровень шума', 'Мощный обогрев'],
    inStock: true,
    fullDescription: 'Канальный кондиционер для скрытой установки в межпотолочное пространство. Полностью невидим в интерьере, обеспечивает тихую и эффективную работу. Возможность подключения нескольких воздуховодов для охлаждения смежных помещений.',
    specifications: {
      'Мощность охлаждения': '5.3 кВт (18000 BTU)',
      'Мощность обогрева': '6.0 кВт',
      'Площадь помещения': 'До 50 м²',
      'Энергоэффективность': 'A+',
      'Уровень шума (внутренний)': '28-38 дБ',
      'Статическое давление': '70 Па',
      'Хладагент': 'R410A',
      'Подключение воздуховодов': 'Диаметр 200 мм'
    },
    warranty: '3 года официальной гарантии производителя',
    delivery: 'Доставка по Москве — бесплатно, монтаж — от 18000₽'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [comparison, setComparison] = useState<ComparisonItem[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isPaymentOpen, setIsPaymentOpen] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'processing' | 'success'>('pending');
  const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
  const [roomArea, setRoomArea] = useState<string>('');
  const [roomHeight, setRoomHeight] = useState<string>('2.7');
  const [sunExposure, setSunExposure] = useState<'low' | 'medium' | 'high'>('medium');
  const [peopleCount, setPeopleCount] = useState<string>('2');
  const [recommendedBTU, setRecommendedBTU] = useState<number | null>(null);

  const categories = ['all', 'Видеонаблюдение', 'Охранные системы', 'Контроль доступа', 'Кондиционеры'];
  
  const calculateBTU = () => {
    if (!roomArea || parseFloat(roomArea) <= 0) return;
    
    const area = parseFloat(roomArea);
    const height = parseFloat(roomHeight);
    const people = parseInt(peopleCount) || 0;
    
    let baseCoefficient = 40;
    if (sunExposure === 'low') baseCoefficient = 35;
    if (sunExposure === 'high') baseCoefficient = 45;
    
    let requiredWatts = area * baseCoefficient;
    requiredWatts += people * 100;
    
    const btuValue = Math.round((requiredWatts / 293.1) * 1000);
    setRecommendedBTU(btuValue);
  };
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const openProductDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.product.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.product.id === product.id 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: number) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setCart(cart.map(item => 
      item.product.id === productId ? { ...item, quantity } : item
    ));
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  };

  const addToComparison = (product: Product) => {
    if (comparison.find(item => item.product.id === product.id)) {
      setComparison(comparison.filter(item => item.product.id !== product.id));
    } else if (comparison.length < 4) {
      setComparison([...comparison, { product }]);
    }
  };

  const removeFromComparison = (productId: number) => {
    setComparison(comparison.filter(item => item.product.id !== productId));
  };

  const isInComparison = (productId: number) => {
    return comparison.some(item => item.product.id === productId);
  };

  const generateQRCode = async () => {
    const totalAmount = getTotalPrice();
    const orderNumber = `ORD-${Date.now()}`;
    const paymentData = `ST00012|Name=Security Systems|PersonalAcc=40702810900000012345|BankName=ПАО Сбербанк|BIC=044525225|CorrespAcc=30101810400000000225|Purpose=Оплата заказа ${orderNumber} на сумму ${totalAmount}руб|Sum=${totalAmount * 100}|PayeeINN=7707083893|KPP=773601001`;
    
    try {
      const url = await QRCode.toDataURL(paymentData, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1E293B',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(url);
    } catch (err) {
      console.error('QR Code generation failed:', err);
    }
  };

  const handlePayment = async () => {
    setIsCartOpen(false);
    setIsPaymentOpen(true);
    await generateQRCode();
    setPaymentStatus('processing');
    
    setTimeout(() => {
      setPaymentStatus('success');
    }, 3000);
  };

  useEffect(() => {
    if (isPaymentOpen && qrCodeUrl === '') {
      generateQRCode();
    }
  }, [isPaymentOpen]);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Shield" size={28} className="text-primary" />
            <span className="text-xl font-bold text-foreground">SECURITY SYSTEMS</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => scrollToSection('home')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'home' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Главная
            </button>
            <button 
              onClick={() => scrollToSection('catalog')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'catalog' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Каталог
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'about' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              О компании
            </button>
            <button 
              onClick={() => scrollToSection('contacts')}
              className={`text-sm font-medium transition-colors hover:text-primary ${activeSection === 'contacts' ? 'text-primary' : 'text-muted-foreground'}`}
            >
              Контакты
            </button>
          </nav>
          <div className="flex items-center gap-3">
            {comparison.length > 0 && (
              <Button 
                variant="outline" 
                size="icon" 
                className="relative"
                onClick={() => setIsComparisonOpen(true)}
              >
                <Icon name="GitCompare" size={20} />
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {comparison.length}
                </Badge>
              </Button>
            )}
            <Button 
              variant="outline" 
              size="icon" 
              className="relative"
              onClick={() => setIsCartOpen(true)}
            >
              <Icon name="ShoppingCart" size={20} />
              {cart.length > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                  {cart.length}
                </Badge>
              )}
            </Button>
            <Button onClick={() => scrollToSection('contacts')}>Связаться</Button>
          </div>
        </div>
      </header>

      <main>
        <section id="home" className="relative py-20 md:py-32 overflow-hidden">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 animate-fade-in">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Профессиональные системы безопасности
                </h1>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Комплексные решения видеонаблюдения и охранных систем для бизнеса. 
                  Надежная защита вашего объекта 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" onClick={() => scrollToSection('catalog')} className="text-base">
                    Смотреть каталог
                  </Button>
                  <Button size="lg" variant="outline" onClick={() => scrollToSection('contacts')} className="text-base">
                    Получить консультацию
                  </Button>
                </div>
              </div>
              <div className="relative h-[400px] lg:h-[500px]">
                <img 
                  src="https://cdn.poehali.dev/projects/efe24ef9-f9e4-40ab-88ec-1ddb60c55c42/files/d145309d-ce74-44af-ab63-a85209489484.jpg"
                  alt="Системы видеонаблюдения"
                  className="w-full h-full object-cover rounded-lg shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-muted/50">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-none shadow-sm hover-scale transition-all">
                <CardContent className="pt-8 pb-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon name="Shield" size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Надежность</h3>
                  <p className="text-muted-foreground">
                    Проверенное оборудование от ведущих производителей с гарантией качества
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm hover-scale transition-all">
                <CardContent className="pt-8 pb-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon name="Headphones" size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Поддержка 24/7</h3>
                  <p className="text-muted-foreground">
                    Круглосуточная техническая поддержка и сервисное обслуживание
                  </p>
                </CardContent>
              </Card>
              <Card className="border-none shadow-sm hover-scale transition-all">
                <CardContent className="pt-8 pb-6 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon name="Award" size={28} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Опыт 15+ лет</h3>
                  <p className="text-muted-foreground">
                    Более 500 реализованных проектов в различных отраслях
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="catalog" className="py-20">
          <div className="container">
            <div className="text-center mb-12 space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">Наш каталог</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Широкий ассортимент систем безопасности для объектов любой сложности
              </p>
            </div>
            
            <div className="space-y-4 mb-12">
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? 'default' : 'outline'}
                    onClick={() => setSelectedCategory(category)}
                    className="capitalize"
                  >
                    {category === 'all' ? 'Все товары' : category}
                  </Button>
                ))}
              </div>
              
              {selectedCategory === 'Кондиционеры' && (
                <div className="flex justify-center">
                  <Button 
                    variant="secondary" 
                    size="lg"
                    onClick={() => setIsCalculatorOpen(true)}
                    className="gap-2"
                  >
                    <Icon name="Calculator" size={18} />
                    Калькулятор подбора кондиционера
                  </Button>
                </div>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="overflow-hidden hover-scale transition-all group flex flex-col">
                  <div className="h-64 overflow-hidden relative">
                    <img 
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {!product.inStock && (
                      <Badge variant="destructive" className="absolute top-3 right-3">
                        Под заказ
                      </Badge>
                    )}
                  </div>
                  <CardContent className="p-6 space-y-4 flex-1 flex flex-col">
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {product.description}
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground">Характеристики:</p>
                      <ul className="space-y-1">
                        {product.features.slice(0, 3).map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm">
                            <Icon name="Check" size={14} className="text-primary flex-shrink-0" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto pt-4 border-t space-y-3">
                      <div className="flex items-baseline justify-between">
                        <span className="text-2xl font-bold text-primary">
                          {product.price.toLocaleString('ru-RU')} ₽
                        </span>
                        <span className="text-xs text-muted-foreground">за единицу</span>
                      </div>
                      <div className="flex gap-2">
                        <Button className="flex-1" onClick={() => addToCart(product)}>
                          <Icon name="ShoppingCart" size={16} className="mr-2" />
                          В заявку
                        </Button>
                        <Button 
                          variant={isInComparison(product.id) ? 'default' : 'outline'}
                          size="icon"
                          onClick={() => addToComparison(product)}
                        >
                          <Icon name="GitCompare" size={18} />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon"
                          onClick={() => openProductDialog(product)}
                        >
                          <Icon name="Info" size={18} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section id="about" className="py-20 bg-muted/30">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">О компании</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p className="text-lg">
                    Мы специализируемся на поставке и внедрении профессиональных систем безопасности для коммерческих и промышленных объектов.
                  </p>
                  <p>
                    Наша команда обладает глубокой экспертизой в области видеонаблюдения, охранных систем и контроля доступа. Мы работаем только с проверенными производителями и предлагаем комплексный подход к обеспечению безопасности вашего бизнеса.
                  </p>
                  <p>
                    За 15 лет работы мы реализовали более 500 проектов различной сложности — от небольших офисов до крупных производственных комплексов и торговых центров.
                  </p>
                </div>
                <div className="grid grid-cols-3 gap-6 pt-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">500+</div>
                    <div className="text-sm text-muted-foreground mt-1">Проектов</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">15+</div>
                    <div className="text-sm text-muted-foreground mt-1">Лет опыта</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary">24/7</div>
                    <div className="text-sm text-muted-foreground mt-1">Поддержка</div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="pt-6 flex gap-4">
                    <Icon name="Target" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Индивидуальный подход</h3>
                      <p className="text-sm text-muted-foreground">
                        Разрабатываем решения с учетом специфики вашего бизнеса и особенностей объекта
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="pt-6 flex gap-4">
                    <Icon name="Settings" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Полный цикл услуг</h3>
                      <p className="text-sm text-muted-foreground">
                        От проектирования и монтажа до технической поддержки и обслуживания
                      </p>
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-l-4 border-l-primary">
                  <CardContent className="pt-6 flex gap-4">
                    <Icon name="CheckCircle" size={24} className="text-primary flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold mb-2">Гарантия качества</h3>
                      <p className="text-sm text-muted-foreground">
                        Используем только сертифицированное оборудование с официальной гарантией
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section id="contacts" className="py-20">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12 space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground">Свяжитесь с нами</h2>
                <p className="text-lg text-muted-foreground">
                  Оставьте заявку и наш специалист свяжется с вами в ближайшее время
                </p>
              </div>
              <div className="grid lg:grid-cols-2 gap-12">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-4">
                      <div className="flex gap-4 items-start">
                        <Icon name="MapPin" size={24} className="text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Адрес</h3>
                          <p className="text-muted-foreground">г. Москва, ул. Профессиональная, д. 15, офис 301</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <Icon name="Phone" size={24} className="text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Телефон</h3>
                          <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <Icon name="Mail" size={24} className="text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Email</h3>
                          <p className="text-muted-foreground">info@securitysystems.ru</p>
                        </div>
                      </div>
                      <div className="flex gap-4 items-start">
                        <Icon name="Clock" size={24} className="text-primary flex-shrink-0 mt-1" />
                        <div>
                          <h3 className="font-semibold mb-1">Режим работы</h3>
                          <p className="text-muted-foreground">Пн-Пт: 9:00 - 18:00<br />Сб-Вс: выходной</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                      <div className="space-y-2">
                        <label htmlFor="name" className="text-sm font-medium">
                          Ваше имя
                        </label>
                        <Input id="name" placeholder="Иван Иванов" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium">
                          Email
                        </label>
                        <Input id="email" type="email" placeholder="ivan@company.ru" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-medium">
                          Телефон
                        </label>
                        <Input id="phone" type="tel" placeholder="+7 (___) ___-__-__" />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-medium">
                          Сообщение
                        </label>
                        <Textarea id="message" placeholder="Опишите ваш проект..." rows={4} />
                      </div>
                      <Button type="submit" className="w-full">
                        Отправить заявку
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-8 bg-muted/30">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Shield" size={24} className="text-primary" />
              <span className="font-semibold">SECURITY SYSTEMS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Security Systems. Все права защищены.
            </p>
          </div>
        </div>
      </footer>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProduct && (
            <>
              <DialogHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <DialogTitle className="text-2xl mb-2">{selectedProduct.name}</DialogTitle>
                    <DialogDescription>
                      <Badge variant="outline">{selectedProduct.category}</Badge>
                    </DialogDescription>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      {selectedProduct.price.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-sm text-muted-foreground">за единицу</div>
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div className="rounded-lg overflow-hidden">
                  <img 
                    src={selectedProduct.image} 
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover"
                  />
                </div>

                <Tabs defaultValue="description" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="description">Описание</TabsTrigger>
                    <TabsTrigger value="specs">Характеристики</TabsTrigger>
                    <TabsTrigger value="delivery">Доставка</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="description" className="space-y-4 mt-4">
                    <div>
                      <h4 className="font-semibold mb-2">О товаре</h4>
                      <p className="text-muted-foreground leading-relaxed">
                        {selectedProduct.fullDescription || selectedProduct.description}
                      </p>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h4 className="font-semibold mb-3">Основные возможности</h4>
                      <div className="grid gap-2">
                        {selectedProduct.features.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Icon name="Check" size={14} className="text-primary" />
                            </div>
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {selectedProduct.warranty && (
                      <>
                        <Separator />
                        <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                          <Icon name="Shield" size={20} className="text-primary mt-0.5" />
                          <div>
                            <h4 className="font-semibold mb-1">Гарантия</h4>
                            <p className="text-sm text-muted-foreground">{selectedProduct.warranty}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </TabsContent>

                  <TabsContent value="specs" className="mt-4">
                    {selectedProduct.specifications ? (
                      <div className="space-y-3">
                        {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                          <div key={key} className="flex justify-between items-start py-3 border-b last:border-0">
                            <span className="font-medium text-sm">{key}</span>
                            <span className="text-sm text-muted-foreground text-right max-w-xs">{value}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        <Icon name="FileQuestion" size={48} className="mx-auto mb-2 opacity-50" />
                        <p>Детальные характеристики уточняйте у менеджера</p>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="delivery" className="space-y-4 mt-4">
                    <div className="space-y-4">
                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <Icon name="Truck" size={20} className="text-primary mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Условия доставки</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedProduct.delivery || 'Доставка по Москве — 1 день, по России — 3-5 дней'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <Icon name="Package" size={20} className="text-primary mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Наличие на складе</h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedProduct.inStock ? 'В наличии, готов к отправке' : 'Под заказ, срок поставки уточняйте'}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                        <Icon name="CreditCard" size={20} className="text-primary mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Оплата</h4>
                          <p className="text-sm text-muted-foreground">
                            Безналичный расчет для юридических лиц, НДС включен
                          </p>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                <Separator />

                <div className="flex gap-3">
                  <Button 
                    className="flex-1" 
                    size="lg"
                    onClick={() => {
                      if (selectedProduct) {
                        addToCart(selectedProduct);
                        setIsDialogOpen(false);
                        setIsCartOpen(true);
                      }
                    }}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Добавить в заявку
                  </Button>
                  <Button 
                    variant={selectedProduct && isInComparison(selectedProduct.id) ? 'default' : 'outline'}
                    size="lg"
                    onClick={() => {
                      if (selectedProduct) {
                        addToComparison(selectedProduct);
                      }
                    }}
                  >
                    <Icon name="GitCompare" size={18} className="mr-2" />
                    Сравнить
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-lg overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Корзина заявок</SheetTitle>
            <SheetDescription>
              Выбранные товары для формирования коммерческого предложения
            </SheetDescription>
          </SheetHeader>

          <div className="mt-8 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="ShoppingCart" size={64} className="mx-auto mb-4 text-muted-foreground opacity-30" />
                <p className="text-muted-foreground">Корзина пуста</p>
                <p className="text-sm text-muted-foreground mt-2">Добавьте товары из каталога</p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <Card key={item.product.id}>
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          <img 
                            src={item.product.image} 
                            alt={item.product.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="flex-1 space-y-2">
                            <h4 className="font-semibold text-sm">{item.product.name}</h4>
                            <Badge variant="outline" className="text-xs">
                              {item.product.category}
                            </Badge>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                >
                                  <Icon name="Minus" size={14} />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button 
                                  variant="outline" 
                                  size="icon" 
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                >
                                  <Icon name="Plus" size={14} />
                                </Button>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className="h-8 w-8 text-destructive"
                                onClick={() => removeFromCart(item.product.id)}
                              >
                                <Icon name="Trash2" size={16} />
                              </Button>
                            </div>
                            <div className="text-right">
                              <span className="text-lg font-bold text-primary">
                                {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                              </span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Всего товаров:</span>
                    <span className="font-semibold">{cart.reduce((sum, item) => sum + item.quantity, 0)} шт</span>
                  </div>
                  <div className="flex justify-between items-center text-lg">
                    <span className="font-semibold">Итого:</span>
                    <span className="text-2xl font-bold text-primary">
                      {getTotalPrice().toLocaleString('ru-RU')} ₽
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    * Итоговая стоимость может измениться после согласования с менеджером
                  </p>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    size="lg"
                    onClick={handlePayment}
                  >
                    <Icon name="QrCode" size={18} className="mr-2" />
                    Оплатить по QR-коду
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full" 
                    size="lg"
                    onClick={() => {
                      setIsCartOpen(false);
                      scrollToSection('contacts');
                    }}
                  >
                    <Icon name="Send" size={18} className="mr-2" />
                    Отправить заявку
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full"
                    onClick={() => setCart([])}
                  >
                    Очистить корзину
                  </Button>
                </div>
              </>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Sheet open={isComparisonOpen} onOpenChange={setIsComparisonOpen}>
        <SheetContent className="w-full sm:max-w-4xl overflow-y-auto">
          <SheetHeader>
            <SheetTitle>Сравнение товаров</SheetTitle>
            <SheetDescription>
              Сравните характеристики до 4 товаров одновременно
            </SheetDescription>
          </SheetHeader>

          <div className="mt-8">
            {comparison.length === 0 ? (
              <div className="text-center py-12">
                <Icon name="GitCompare" size={64} className="mx-auto mb-4 text-muted-foreground opacity-30" />
                <p className="text-muted-foreground">Нет товаров для сравнения</p>
                <p className="text-sm text-muted-foreground mt-2">Добавьте товары из каталога</p>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {comparison.map((item) => (
                    <Card key={item.product.id} className="relative">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 z-10"
                        onClick={() => removeFromComparison(item.product.id)}
                      >
                        <Icon name="X" size={16} />
                      </Button>
                      <CardContent className="p-4 space-y-3">
                        <img 
                          src={item.product.image} 
                          alt={item.product.name}
                          className="w-full h-32 object-cover rounded"
                        />
                        <div>
                          <Badge variant="outline" className="text-xs mb-2">
                            {item.product.category}
                          </Badge>
                          <h4 className="font-semibold text-sm mb-2">{item.product.name}</h4>
                          <div className="text-xl font-bold text-primary mb-3">
                            {item.product.price.toLocaleString('ru-RU')} ₽
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-2">
                          <p className="text-xs font-semibold text-muted-foreground">Характеристики:</p>
                          {item.product.specifications ? (
                            <div className="space-y-1">
                              {Object.entries(item.product.specifications).slice(0, 5).map(([key, value]) => (
                                <div key={key} className="text-xs">
                                  <span className="text-muted-foreground">{key}:</span>{' '}
                                  <span className="font-medium">{value}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="space-y-1">
                              {item.product.features.slice(0, 5).map((feature, idx) => (
                                <div key={idx} className="text-xs flex items-start gap-1">
                                  <Icon name="Check" size={12} className="text-primary mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                        <Button 
                          className="w-full" 
                          size="sm"
                          onClick={() => {
                            addToCart(item.product);
                            setIsComparisonOpen(false);
                            setIsCartOpen(true);
                          }}
                        >
                          <Icon name="ShoppingCart" size={14} className="mr-2" />
                          В заявку
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="flex gap-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => setComparison([])}
                  >
                    Очистить
                  </Button>
                  <Button 
                    className="flex-1"
                    onClick={() => {
                      comparison.forEach(item => addToCart(item.product));
                      setIsComparisonOpen(false);
                      setIsCartOpen(true);
                    }}
                  >
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Добавить все в заявку
                  </Button>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>

      <Dialog open={isPaymentOpen} onOpenChange={setIsPaymentOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Оплата по QR-коду</DialogTitle>
            <DialogDescription>
              Отсканируйте QR-код в приложении вашего банка для оплаты заказа
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            {paymentStatus === 'processing' && (
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  <div className="animate-spin">
                    <Icon name="Loader2" size={48} className="text-primary" />
                  </div>
                </div>
                <p className="text-muted-foreground">Формируем QR-код для оплаты...</p>
              </div>
            )}

            {paymentStatus === 'success' && qrCodeUrl && (
              <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border-2 border-primary/20">
                  <div className="flex justify-center mb-4">
                    <img src={qrCodeUrl} alt="QR код для оплаты" className="w-64 h-64" />
                  </div>
                  
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <Icon name="QrCode" size={20} />
                      <span className="font-semibold">СБП (Система Быстрых Платежей)</span>
                    </div>
                    <div className="text-2xl font-bold">
                      {getTotalPrice().toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                </div>

                <Card className="bg-muted/30 border-none">
                  <CardContent className="pt-6 space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Откройте приложение банка</p>
                        <p className="text-sm text-muted-foreground">Сбербанк, Тинькофф, ВТБ или любой другой</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Найдите раздел оплаты по QR</p>
                        <p className="text-sm text-muted-foreground">Обычно находится в разделе "Платежи"</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Отсканируйте QR-код</p>
                        <p className="text-sm text-muted-foreground">Наведите камеру на код выше</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-primary font-bold">4</span>
                      </div>
                      <div>
                        <p className="font-medium">Подтвердите платеж</p>
                        <p className="text-sm text-muted-foreground">Проверьте сумму и завершите оплату</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
                  <Icon name="Info" size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-medium mb-1">Важная информация</p>
                    <ul className="space-y-1 text-blue-800">
                      <li>• После оплаты мы получим уведомление автоматически</li>
                      <li>• Счет будет выставлен в течение 1 рабочего дня</li>
                      <li>• Товар отправится после зачисления средств</li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button 
                    className="w-full" 
                    onClick={() => {
                      setIsPaymentOpen(false);
                      setCart([]);
                      setPaymentStatus('pending');
                    }}
                  >
                    <Icon name="CheckCircle" size={18} className="mr-2" />
                    Оплатил, завершить
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setIsPaymentOpen(false);
                      setPaymentStatus('pending');
                      setIsCartOpen(true);
                    }}
                  >
                    Вернуться в корзину
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isCalculatorOpen} onOpenChange={setIsCalculatorOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Калькулятор подбора кондиционера</DialogTitle>
            <DialogDescription>
              Ответьте на несколько вопросов, и мы подберем подходящий кондиционер для вашего помещения
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Площадь помещения (м²)</label>
                <Input 
                  type="number" 
                  placeholder="Например: 25"
                  value={roomArea}
                  onChange={(e) => setRoomArea(e.target.value)}
                  min="1"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Высота потолков (м)</label>
                <Input 
                  type="number" 
                  placeholder="Например: 2.7"
                  value={roomHeight}
                  onChange={(e) => setRoomHeight(e.target.value)}
                  step="0.1"
                  min="2"
                  max="5"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Количество людей</label>
                <Input 
                  type="number" 
                  placeholder="Например: 2"
                  value={peopleCount}
                  onChange={(e) => setPeopleCount(e.target.value)}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Солнечная сторона</label>
                <div className="grid grid-cols-3 gap-2">
                  <Button 
                    variant={sunExposure === 'low' ? 'default' : 'outline'}
                    onClick={() => setSunExposure('low')}
                    className="text-xs"
                  >
                    Север
                  </Button>
                  <Button 
                    variant={sunExposure === 'medium' ? 'default' : 'outline'}
                    onClick={() => setSunExposure('medium')}
                    className="text-xs"
                  >
                    Восток/Запад
                  </Button>
                  <Button 
                    variant={sunExposure === 'high' ? 'default' : 'outline'}
                    onClick={() => setSunExposure('high')}
                    className="text-xs"
                  >
                    Юг
                  </Button>
                </div>
              </div>
            </div>

            <Card className="bg-muted/30 border-none">
              <CardContent className="pt-6">
                <div className="flex items-start gap-3">
                  <Icon name="Info" size={20} className="text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong>Как правильно выбрать:</strong></p>
                    <ul className="space-y-1 ml-4">
                      <li>• Для спален выбирайте модели с низким уровнем шума (до 22 дБ)</li>
                      <li>• Для офисов подойдут кассетные или канальные модели</li>
                      <li>• Инверторные модели экономят до 40% электроэнергии</li>
                      <li>• Учитывайте высоту потолков — чем выше, тем мощнее нужен кондиционер</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button 
              className="w-full" 
              size="lg"
              onClick={calculateBTU}
              disabled={!roomArea || parseFloat(roomArea) <= 0}
            >
              <Icon name="Calculator" size={18} className="mr-2" />
              Рассчитать мощность
            </Button>

            {recommendedBTU && (
              <div className="space-y-4">
                <Card className="border-2 border-primary bg-primary/5">
                  <CardContent className="pt-6 text-center space-y-3">
                    <div className="flex items-center justify-center gap-2">
                      <Icon name="Zap" size={24} className="text-primary" />
                      <h3 className="text-xl font-bold">Рекомендуемая мощность</h3>
                    </div>
                    <p className="text-4xl font-bold text-primary">{recommendedBTU.toLocaleString()} BTU</p>
                    <p className="text-sm text-muted-foreground">
                      ≈ {(recommendedBTU / 3412).toFixed(1)} кВт
                    </p>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <p className="text-sm font-medium">Подходящие модели из каталога:</p>
                  <div className="space-y-2">
                    {products
                      .filter(p => p.category === 'Кондиционеры')
                      .filter(p => {
                        const match = p.name.match(/(\d+)000\s*BTU/);
                        if (!match) return false;
                        const btu = parseInt(match[1]) * 1000;
                        return btu >= recommendedBTU * 0.8 && btu <= recommendedBTU * 1.2;
                      })
                      .map(product => (
                        <Card key={product.id} className="cursor-pointer hover:border-primary transition-colors" onClick={() => {
                          setIsCalculatorOpen(false);
                          setSelectedCategory('Кондиционеры');
                          openProductDialog(product);
                        }}>
                          <CardContent className="p-4 flex items-center gap-4">
                            <img 
                              src={product.image} 
                              alt={product.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                            <div className="flex-1 min-w-0">
                              <h4 className="font-semibold text-sm truncate">{product.name}</h4>
                              <p className="text-xs text-muted-foreground">{product.description}</p>
                            </div>
                            <div className="text-right">
                              <p className="font-bold text-primary">{product.price.toLocaleString()} ₽</p>
                              <Button size="sm" className="mt-1" onClick={(e) => {
                                e.stopPropagation();
                                addToCart(product);
                                setIsCalculatorOpen(false);
                              }}>
                                В заявку
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                  
                  {products.filter(p => p.category === 'Кондиционеры').filter(p => {
                    const match = p.name.match(/(\d+)000\s*BTU/);
                    if (!match) return false;
                    const btu = parseInt(match[1]) * 1000;
                    return btu >= recommendedBTU * 0.8 && btu <= recommendedBTU * 1.2;
                  }).length === 0 && (
                    <Card className="bg-yellow-50 border-yellow-200">
                      <CardContent className="p-4 flex items-start gap-3">
                        <Icon name="AlertCircle" size={20} className="text-yellow-600 flex-shrink-0" />
                        <div className="text-sm">
                          <p className="font-medium text-yellow-900">Подходящая модель не найдена</p>
                          <p className="text-yellow-800">Свяжитесь с нами для индивидуального подбора оборудования</p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setRecommendedBTU(null);
                    setRoomArea('');
                    setPeopleCount('2');
                    setRoomHeight('2.7');
                    setSunExposure('medium');
                  }}
                >
                  Рассчитать заново
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;