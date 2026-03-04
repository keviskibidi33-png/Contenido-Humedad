export type SiNoSelect = 'SI' | 'NO' | '-'

export interface ContHumedadPayload {
    muestra: string
    numero_ot: string
    fecha_ensayo: string
    realizado_por: string

    numero_ensayo?: number | null
    recipiente_numero?: string | null
    masa_recipiente_muestra_humedo_g?: number | null
    masa_recipiente_muestra_seco_g?: number | null
    masa_recipiente_muestra_seco_constante_g?: number | null
    masa_agua_g?: number | null
    masa_recipiente_g?: number | null
    masa_muestra_seco_g?: number | null
    contenido_humedad_pct?: number | null

    tipo_muestra?: string | null
    tamano_maximo_muestra_visual_in?: string | null
    cumple_masa_minima_norma?: SiNoSelect | null
    se_excluyo_material?: SiNoSelect | null
    descripcion_material_excluido?: string | null

    balanza_01g_codigo?: string | null
    horno_110c_codigo?: string | null

    observaciones?: string | null
    revisado_por?: string | null
    revisado_fecha?: string | null
    aprobado_por?: string | null
    aprobado_fecha?: string | null
}

export interface ContHumedadEnsayoSummary {
    id: number
    numero_ensayo: string
    numero_ot: string
    cliente?: string | null
    muestra?: string | null
    fecha_documento?: string | null
    estado: string
    contenido_humedad_pct?: number | null
    bucket?: string | null
    object_key?: string | null
    fecha_creacion?: string | null
    fecha_actualizacion?: string | null
}

export interface ContHumedadEnsayoDetail extends ContHumedadEnsayoSummary {
    payload?: ContHumedadPayload | null
}

export interface ContHumedadSaveResponse {
    id: number
    numero_ensayo: string
    numero_ot: string
    estado: string
    contenido_humedad_pct?: number | null
    bucket?: string | null
    object_key?: string | null
    fecha_creacion?: string | null
    fecha_actualizacion?: string | null
}
