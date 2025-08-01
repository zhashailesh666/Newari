from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Product
from schemas import ProductCreate, ProductUpdate, Product as ProductSchema
from auth import get_current_admin

router = APIRouter(prefix="/api/products", tags=["products"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/", response_model=list[ProductSchema])
def list_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

@router.post("/", response_model=ProductSchema, status_code=status.HTTP_201_CREATED)
def create_product(product: ProductCreate, db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    if db.query(Product).count() >= 100:
        raise HTTPException(status_code=400, detail="Product limit reached (100)")
    db_product = Product(**product.dict())
    db.add(db_product)
    db.commit()
    db.refresh(db_product)
    return db_product

@router.put("/{product_id}", response_model=ProductSchema)
def update_product(product_id: int, product: ProductUpdate, db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    # Get update data excluding None values
    update_data = product.dict(exclude_unset=True, exclude_none=True)
    
    # Update only provided fields
    for key, value in update_data.items():
        if hasattr(db_product, key):
            setattr(db_product, key, value)
        
    try:
        db.commit()
        db.refresh(db_product)
        return db_product
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Update failed: {str(e)}")

@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_product(product_id: int, db: Session = Depends(get_db), admin: str = Depends(get_current_admin)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    
    try:
        db.delete(db_product)
        db.commit()
        return
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=f"Delete failed: {str(e)}")

@router.get("/{product_id}", response_model=ProductSchema)
def get_product(product_id: int, db: Session = Depends(get_db)):
    db_product = db.query(Product).filter(Product.id == product_id).first()
    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")
    db_product.view_count += 1
    db.commit()
    db.refresh(db_product)
    return db_product 

# --- Initial Product Creation Script ---
def create_initial_products():
    import os
    from models import Product
    from database import SessionLocal
    image_dir = os.path.join(os.path.dirname(__file__), '../public/lovable-uploads')
    # Example mapping, replace with real mapping if available
    product_info = {
        'BHOJ_SPECIAL_BLUE.png': {
            'name': 'BHOJ SPECIAL (BLUE)',
            'description': '1121 Long Grain Steam Rice, meticulously crafted to bring the authentic flavors of Newar cuisine to your table. Perfect for those who appreciate the art of cooking and Nepalese culinary traditions.\n\nPACKAGING 1 KG 5 KG 20 KG'
        },
        'SANJEEVANI.png': {
            'name': 'SANJEEVANI',
            'description': 'Sanjeevani Basmati Rice, a premium choice that embodies the true essence of flavor, aroma, and tradition. Sourced from pristine fields, this rice is perfect for those who appreciate the finer things in life.\n\nPACKAGING 1 KG 5 KG 20 KG'
        },
        'NEWARI_SHAHI_PULAO.png': {
            'name': 'NEWARI SHAHI PULAO',
            'description': 'Indulge in the delicious flavors of our Shahi Pulao Basmati Rice, a premium selection that transforms your dining experience into a royal feast.\n\nPACKAGING 1 KG 5 KG 20 KG'
        },
        'NEWARI_DIAMOND.png': {
            'name': 'NEWARI DIAMOND',
            'description': 'Newari Diamond Rice is the epitome of premium quality, crafted to bring the finest rice experience to your table. This variety boasts long, slender grains with a distinct glossy finish that sets it apart. Its fluffy, ret non-sticky texture and natural aroma make it the Basmati Rice ideal choice for elevating both everyday meals and ‘ special occasions.\n\nPACKAGING 1KG 5 KG 20 KG'
        },
        'MAKHANKHOR.png': {
            'name': 'MAKHANKHOR',
            'description': 'Makhankhor Long Grain Basmati Rice is perfectly crafted for those who appreciate the finer aspects of rice. This long grain variety promises to transform every meal into a delightful experience.\n\nPACKAGING 1 KG 5 KG 20 KG'
        },
        'MUSKAN.png': {
            'name': 'MUSKAN',
            'description': 'Transform your kitchen into a world of culinary exploration with our Long Grain Rice, where each meal is a delicious journey waiting to be savored!\n\nPACKAGING | 1 KG 5 KG'
        },
        'ROYAL_JIMBU.png': {
            'name': 'ROYAL JIMBU',
            'description': 'Unleash your culinary creativity with our Long Grain Pulao Rice, a versatile gem that promises to turn every meal into a flavorful celebration.\n\nPACKAGING 1 KG 5 KG 20 KG'
        },
        'MANMOHAN.png': {
            'name': 'MANMOHAN',
            'description': 'Manmohan Long Basmati Rice is a premium variety that brings together exceptional quality, long slender grains, and an unbeatable texture. Sourced from fertile fields, this rice is perfect for those who appreciate simplicity without compromising on taste.\n\nPACKAGING | 1KG 5 KG 20KG |'
        },
        'LONG_GRAIN.png': {
            'name': 'LONG GRAIN',
            'description': '1121 Long Grain. Party Rice'
        },
        'BHOJ_SPECIAL_RED.png': {
            'name': 'BHOJ SPECIAL (RED)',
            'description': 'Bhoj Long Grain Sella Rice is a premium variety 1121 Long Grain known for its long, slender grains, rich poy ie aroma, and light, fluffy texture. The result is a rice Specially for :- Paloo, Biryani, . oo. oe . aay tap ere that is not only delicious but also nutritionally rich, I us making it a perfect addition to any meal, from everyday dishes to special feasts.\n\nPACKAGING 5K 20 KG'
        },
        'NEWARI.png': {
            'name': 'NEWARI',
            'description': 'Newari Usina Basmati Rice is the perfect blend of tradition and quality, offering an authentic basmati experience. This premium rice variety is known for its long, slender grains, exquisite aroma, and rich flavor. The rice is processed with utmost care to retain its natural goodness, making it ideal for those who appreciate both taste and nutrition in their meals.\n\nPACKAGING 1 KG 5 KG 20 KG'
        },
        'ROYAL_TASTY.png': {
            'name': 'ROYAL TASTY',
            'description': 'Elevate your meals with our premium Long Grain Usina Rice, a choice that embodies quality, flavor, and versatility. This rice is the perfect foundation for a variety of delicious dishes, from everyday meals to festive feasts.\n\nPACKAGING 5 KG 20 KG'
        },
        'MAKHANKHOR_ROZANA.png': {
            'name': 'MAKHANKHOR ROZANA',
            'description': 'Makhankhor Rozana Rice is the ideal choice for families who seek high-quality, long-grain rice for their everyday meals. With its superior texture and flavor, Makhankhor Rozana Rice adds a touch of excellence to every dish while being affordable for daily use.\n\nPACKAGING 5 KG 20 KG'
        },
        'EXCLUSIVE_PREMIUM_RANGE.png': {
            'name': 'EXCLUSIVE PREMIUM RANGE',
            'description': 'P i ay’ PREMIUM at ‘ KATARAN Pres ace | e agrees i a'
        },
        'NEWARI_KOLAM.png': {
            'name': 'NEWARI KOLAM',
            'description': 'Newari Kolam Rice is a premium quality rice variety known for its soft texture, non-sticky nature, and delicate aroma. It is an everyday essential for households that prefer light, easy-to-digest, and flavorful rice. Sourced from the finest farms, this rice is naturally processed to maintain its purity and nutritional value.\n\nPACKAGING 20 KG'
        },
        'NEWARI_GOLD.png': {
            'name': 'NEWARI GOLD',
            'description': 'Crafted for those who appreciate superior quality and rich taste. Newari Gold is a premium-grade rice that brings the perfect blend of softness, aroma, and nutrition to your meals. Sourced from the finest farms, it is carefully processed to retain its natural goodness and authentic flavor.\n\nPACKAGING 20 KG'
        },
        'RIPURAJ_SONASHAKTI.png': {
            'name': 'RIPURAJ SONASHAKTI',
            'description': 'Experience the rich taste, superior quality, and health benefits of Ripuraj Sonashakti Rice. This small-grain, parboiled rice variety is known for its distinct aroma, non-sticky texture, and high nutritional content, making it a staple choice for traditional meals.\n\nPACKAGING 20 KG'
        },
        'JAI_HO.png': {
            'name': 'JAI HO',
            'description': 'Jai Ho Premium Sonam Rice is a premium quality rice variety that brings together the rich, aromatic flavor of Sonam rice with the benefits of modern steam processing. Known for its long grains, delicate fragrance, and non-sticky texture, it is the perfect choice for daily meals, festive occasions, and special dishes.\n\nPACKAGING 20 KG'
        },
        'NEWARI_KATARANI.png': {
            'name': 'NEWARI KATARANI',
            'description': 'Newari Katarani Rice is a premium-quality, aromatic rice variety, cherished for its unique fragrance, rich flavor, and soft texture. Grown in select regions, this rice is naturally aged to enhance its aroma and taste, making it a preferred choice for traditional and festive meals.\n\nPACKAGING 25 KG'
        },
        'RIPURAJ_MAHASHAKTI.png': {
            'name': 'RIPURAJ MAHASHAKTI',
            'description': 'Ripuraj Mahashakti is a premium quality rice variety that combines the power of tradition with modern processing techniques. This premium rice is enriched with nutrients and offers a hearty, satisfying texture. Known for its firm grains and non-sticky nature. Ripuraj Mahashakti Rice is the ideal choice for those who seek a nutritious, wholesome meal every day.\n\nPACKAGING 20 KG 25 KG'
        },
        'JAI_HO_-_PREMIUM_JEERA_RICE.png': {
            'name': 'JAI HO PREMIUM JEERA RICE',
            'description': 'Jai Ho Premium Jeera Rice is a high-quality, aromatic rice variety known for its unique flavor and rich texture. Sourced from the finest rice fields, this product is perfect for preparing a variety of dishes, from biryanis to simple jeera rice. The rice is meticulously processed to retain its natural flavor and aroma, providing a delightful culinary experience.\n\nPACKAGING 25 KG'
        },
        'NEWARI_POKHARELI.png': {
            'name': 'NEWARI POKHARELI',
            'description': 'Newari Pokhareli Rice is a fine selection of aromatic rice that combines the rich aroma and the exquisite texture of Masino rice. This premium rice variety is meticulously steam-processed to retain its natural nutrients and flavor, offering a perfect blend of taste, texture, and quality.\n\nPACKAGING 25 KG'
        },
        'DAJU_BHAI.png': {
            'name': 'DAJU BHAI',
            'description': 'Daju Bhai Rice is a flavorful, aromatic rice variety that brings a delightful experience to your meals. Known for its rich taste and the subtle yet distinct aroma. This rice is perfect for everyday dining or special occasions.\n\nPACKAGING 25 KG'
        },
        'MAKHANKHOR_-_JEERA_RICE.png': {
            'name': 'MAKHANKHOR JEERA RICE',
            'description': 'Makhankhor Premium Sonam Rice is a superior-quality rice variety known for its long grains, rich aroma, and soft, fluffy texture. This premium rice is handpicked and carefully processed to preserve its natural goodness. Whether you\'re preparing a simple meal or an elaborate feast, Makhankhor Premium Sonam Rice brings a touch of perfection to every dish.\n\nPACKAGING | 25 KG'
        },
        'GOLD_COIN.png': {
            'name': 'GOLD COIN',
            'description': 'Gold Coin Rice is a top-tier rice variety that delivers a perfect blend of aroma, flavor, and texture. Ideal for those who appreciate the finer things in life, this rice elevates everyday meals and special occasions with its distinctive flavor and quality.\n\nPACKAGING 25 KG'
        },
        'LOVE.png': {
            'name': 'LOVE',
            'description': 'Love Jeera Rice is a premium-quality, small-grain aromatic rice known for its delicate fragrance and rich taste. It is perfect for everyday meals and special occasions, providing a light and fluffy texture that pairs well with a variety of dishes.\n\nPACKAGING 25 KG'
        },
        'MUNNA_SHAHI.png': {
            'name': 'MUNNA SHAHI',
            'description': 'Munna Shahi Special Rice is a premium rice variety that combines the exceptional quality of Shahi rice with aroma. With its long, slender grains and light, non-sticky texture. Munna Shahi Jeera Special Rice is the perfect choice for those who seek both flavor and quality in every meal.\n\nPACKAGING 26 KG'
        },
        'RAJDOOT.png': {
            'name': 'RAJDOOT',
            'description': 'Rajdoot Premium Rice is the perfect blend of purity, texture, and flavor. Each grain is packed with natural nutrients, offering a soft, fluffy, and non-sticky texture when cooked. Whether it’s for everyday meals or special feasts, Rajdoot Rice adds an authentic touch to any dish.\n\nPACKAGING 25 KG'
        },
        'NEWARI_USINA.png': {
            'name': 'NEWARI USINA',
            'description': 'Newari Usina Jeera Rice is a top-tier rice variety that i delivers exceptional flavor and texture, sourced STE BUD: ae from the best rice fields. This premium rice offers a JEERA RICE perfect balance of taste, fragrance, and quality. The unique Usina variety ensures that each grain remains separate, fluffy, and non-sticky, making it an ideal choice for a variety of rice-based dishes.\n\nPACKAGING 25 KG'
        }
    }
    db = SessionLocal()
    # Always clear all products before seeding
    db.query(Product).delete()
    db.commit()
    for img, info in product_info.items():
        db.add(Product(
            name=info['name'],
            image=f'/lovable-uploads/{img}',
            description=info['description'],
            view_count=0
        ))
    db.commit()
    db.close()

if __name__ == '__main__':
    create_initial_products()
