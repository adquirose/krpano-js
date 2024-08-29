<?php
	
	include "php/conexion.php";
	include "php/registrar_evento.php";
	include "php/includes/funciones_generales.php";

	
	//se consultan los campos estras 
	$sql = "SELECT 
				nombre_campo, 
				identificador_xml
			FROM
				t_campos
			WHERE 
				estatus = 'A'";
	
	$resultados = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

	$campos_sql =  array(); 
	$campos_html =  array(); 
	
	while($ln = mysqli_fetch_array($resultados)){
		$campos_html[] = $ln;
		$campos_sql[] = $ln['identificador_xml'];
	}


	$sql_campos = implode(",", $campos_sql );

	$sql = "SELECT 
				date_format(fecha, '%d/%m/%Y') as fecha_s, 
				nombre_proyecto,
				`id`, 
				`nombre_zona`, 
				`coordenadas_google`, 
				`cantidad_lotes`, 
				`zonas_comunes`, 
				`etapa_proyecto`, 
				`km_centro_urbano`, 
				`luz_agua`, 
				`texto_extra_1`, 
				`texto_extra_2`, 
				`numero_extra_1`, 
				`numero_extra_2`, 
				`pais`,
				$sql_campos
			FROM
				t_lectura as tl 
					inner join
				t_proyectos as tp on (tl.id_proyecto = tp.id_proyecto)
			WHERE 
				tp.eliminado = 'N'
			ORDER BY 
				tl.fecha_registro
			";

	$resultados = mysqli_query($conexion, $sql) or die(mysqli_error($conexion));

 ?>
<table id="tabla_consultar" class="table table-striped table-bordered" cellspacing="0" width="100%">
	<thead>
		<tr>
			<th>Fecha</th>
			<th>Nombre proyecto</th>
			<th>ID</th>
			<th>Nombre Zona</th>
			<th>Coordenadas Google</th>
			<th>Cantidad de Lotes</th>
			<th>Zonas comunes</th>
			<th>Etapa del proyecto</th>
			<th>Km a centro urbano</th>
			<th>Luz/Agua</th>
			<th>Texto Extra 1</th>
			<th>Texto Extra 2</th>
			<th>Numero Extra 1</th>
			<th>Numero Extra 2</th>
			<th>País</th>
			
			<?php 
				foreach ($campos_html as $key => $value) {
					echo "<th> ".$value['nombre_campo']." </th>";
				}
			?>

			
		</tr>
	</thead>
	<tbody>
		<?php

			while ($linea=mysqli_fetch_array($resultados)) {
			
				echo "<tr>
					<td>$linea[fecha_s] </td>
					<td>$linea[nombre_proyecto] </td>
					<td>$linea[id] </td>
					<td>$linea[nombre_zona] </td>
					<td>$linea[coordenadas_google] </td>
					<td>$linea[cantidad_lotes] </td>
					<td>$linea[zonas_comunes] </td>
					<td>$linea[etapa_proyecto] </td>
					<td>$linea[km_centro_urbano] </td>
					<td>$linea[luz_agua] </td>
					<td>$linea[texto_extra_1] </td>
					<td>$linea[texto_extra_2] </td>
					<td>$linea[numero_extra_1] </td>
					<td>$linea[numero_extra_2] </td>
					<td>$linea[pais] </td>
					";
				foreach ($campos_html as $key => $value) {
					echo "<td> ".$linea[$value['identificador_xml']]." </td>";
				}
				echo "</tr>";
				
			}

			
		?>
	</tbody>
	
</table>
