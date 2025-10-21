import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

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
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const categories = ['all', 'Видеонаблюдение', 'Охранные системы', 'Контроль доступа'];
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const openProductDialog = (product: Product) => {
    setSelectedProduct(product);
    setIsDialogOpen(true);
  };

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
          <Button onClick={() => scrollToSection('contacts')}>Связаться</Button>
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
            
            <div className="flex flex-wrap justify-center gap-3 mb-12">
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
                        <Button className="flex-1">
                          Заказать
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
                  <Button className="flex-1" size="lg">
                    <Icon name="ShoppingCart" size={18} className="mr-2" />
                    Добавить в заявку
                  </Button>
                  <Button variant="outline" size="lg" onClick={() => scrollToSection('contacts')}>
                    <Icon name="Phone" size={18} className="mr-2" />
                    Консультация
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;