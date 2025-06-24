from fastapi import APIRouter, Depends, HTTPException, Path
from sqlalchemy.orm import Session
from app.database import SessionLocal
from app.schemas.cliente import ClienteCreate, ClienteOut
from app.dao.cliente_dao import ClienteDAO

router = APIRouter(prefix="/clientes", tags=["Clientes"])

# Dependencia para obtener la sesión de base de datos
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Crear cliente usando el DAO
@router.post("/", response_model=ClienteOut)
def crear_cliente(cliente: ClienteCreate, db: Session = Depends(get_db)):
    dao = ClienteDAO(db)
    return dao.crear_cliente(cliente)

# Listar clientes usando el DAO
@router.get("/", response_model=list[ClienteOut])
def listar_clientes(db: Session = Depends(get_db)):
    dao = ClienteDAO(db)
    return dao.listar_clientes()

# Actualizar clientes usando el DAO
@router.put("/{cliente_id}", response_model=ClienteOut)
def actualizar_cliente(
    cliente_id: int = Path(..., description="ID del cliente a actualizar"),
    cliente: ClienteCreate = ...,
    db: Session = Depends(get_db)
):
    dao = ClienteDAO(db)
    cliente_actualizado = dao.actualizar_cliente(cliente_id, cliente)
    if not cliente_actualizado:
        raise HTTPException(status_code=404, detail="Cliente no encontrado")
    return cliente_actualizado