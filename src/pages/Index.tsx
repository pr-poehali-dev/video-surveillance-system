import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

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
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="overflow-hidden hover-scale transition-all group">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/projects/efe24ef9-f9e4-40ab-88ec-1ddb60c55c42/files/d145309d-ce74-44af-ab63-a85209489484.jpg"
                    alt="Системы видеонаблюдения"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold">Видеонаблюдение</h3>
                  <p className="text-muted-foreground">
                    IP и аналоговые камеры, видеорегистраторы, системы хранения данных
                  </p>
                  <Button variant="outline" className="w-full">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover-scale transition-all group">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/projects/efe24ef9-f9e4-40ab-88ec-1ddb60c55c42/files/fac51a00-1a29-44f5-a50c-85d204887143.jpg"
                    alt="Охранные системы"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold">Охранные сигнализации</h3>
                  <p className="text-muted-foreground">
                    Беспроводные и проводные системы, панели управления, датчики движения
                  </p>
                  <Button variant="outline" className="w-full">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>

              <Card className="overflow-hidden hover-scale transition-all group">
                <div className="h-64 overflow-hidden">
                  <img 
                    src="https://cdn.poehali.dev/projects/efe24ef9-f9e4-40ab-88ec-1ddb60c55c42/files/c8f61573-9f26-4403-9d59-328e7f472f78.jpg"
                    alt="Контроль доступа"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardContent className="p-6 space-y-3">
                  <h3 className="text-xl font-semibold">Контроль доступа</h3>
                  <p className="text-muted-foreground">
                    СКУД, биометрические системы, электронные замки и считыватели
                  </p>
                  <Button variant="outline" className="w-full">
                    Подробнее
                  </Button>
                </CardContent>
              </Card>
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
    </div>
  );
};

export default Index;
